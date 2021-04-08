using Cheapshot.Exprience.Data.Model;
using Cheapshot.Inspector.Api;
using Cheapshot.Inspector.Model;
using Cheapshot.Inspector.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Cheapshot.Inspector {
    public class Worker : IHostedService, IDisposable {
        private readonly ILogger<Worker> m_logger;
        private readonly IServiceScopeFactory m_scopeFactory;
        private readonly InspectService m_inspectService;

        private List<InspectCollection> InspectCollection { get; set; }

        private Timer m_timer;

        public Worker(ILogger<Worker> logger, IServiceScopeFactory scopeFactory) {
            m_scopeFactory = scopeFactory;
            m_logger = logger;
            m_inspectService = new InspectService();
            InspectCollection = new List<InspectCollection>();

        }

        public void GetNewData(object state) {
            var utcNow = DateTime.UtcNow.TimeOfDay;
            var etalonStart = new TimeSpan(18, 55, 0);
            var etalonEnd = new TimeSpan(19, 5, 0);

            if (utcNow > etalonStart && utcNow < etalonEnd) {
                m_logger.LogInformation($"Начало загрузки статистики в {utcNow.Hours}:{utcNow.Minutes} UTC!"); ;
                using (var scope = m_scopeFactory.CreateScope()) {
                    var start = DateTime.UtcNow;
                    var dc = scope.ServiceProvider.GetService<IWorkerContext>();
                    var cities = dc.GetAllCities();

                    foreach (var city in cities) {
                        DownloadUsersFromInspectByCity(city);
                    }
                    UpdateUsers(dc);
                    InsertExperience(dc);
                    Clear();
                    m_logger.LogInformation($"Загрузка статистики выполнена за {(DateTime.UtcNow - start).TotalSeconds} секунд!"); ;

                }
            } else
                m_logger.LogInformation($"Неподходящее время сбора статистики в {utcNow.Hours}:{utcNow.Minutes} UTC!"); ;

        }


        public Task StartAsync(CancellationToken cancellationToken) {
            m_logger.LogInformation("Timed Background Service is starting.");

            m_timer = new Timer(GetNewData, null, TimeSpan.Zero, TimeSpan.FromSeconds(3600));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken) {
            m_logger.LogInformation("Timed Background Service is stopping.");

            m_timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose() {
            m_timer?.Dispose();
        }

        private void DownloadUsersFromInspectByCity(CityEntity city) {
            var cityCollection = new InspectCollection {
                Users = new List<User>(),
                CityId = city.Id
            };
            var userIds = new List<long>();

            foreach (var location in city.Locations) {
                var url = ApiHelper.GetInspectUrl(location.lat, location.lon);
                var users = m_inspectService.GetUsers(url);
                if (users.Length > 0)
                    foreach (var user in users) {
                        if (user.Role == "user" && !userIds.Contains(user.UserId)) {
                            cityCollection.Users.Add(user);
                            userIds.Add(user.UserId);
                        }
                    }
            }
            InspectCollection.Add(cityCollection);
            m_logger.LogInformation($"Найдено: {cityCollection.Users.Count} игроков в {city.Name}");



        }

        private void UpdateUsers(IWorkerContext dc) {
            var existingUsers = dc.GetAllUsers();
            var insertOrUpdateUsers = new List<UserEntity>();
            var newUsersCount = 0;
            var updateUsersCount = 0;

            foreach (var collection in InspectCollection) {
                foreach (var user in collection.Users) {
                    var oldUser = existingUsers.SingleOrDefault(x => x.UserId == user.UserId);
                    if (oldUser != null && insertOrUpdateUsers.SingleOrDefault(x => x.UserId == user.UserId) == null) {
                        oldUser.Name = user.Name;
                        oldUser.UserPic = user.Userpic;
                        oldUser.Level = user.Level;
                        insertOrUpdateUsers.Add(oldUser);
                        updateUsersCount++;
                    } else {
                        if (insertOrUpdateUsers.SingleOrDefault(x => x.UserId == user.UserId) == null) {
                            insertOrUpdateUsers.Add(new UserEntity {
                                Level = user.Level,
                                Name = user.Name,
                                UserId = user.UserId,
                                UserPic = user.Userpic
                            });
                            newUsersCount++;
                        }
                    }
                }
            }

            dc.UpdateRangeUsers(insertOrUpdateUsers.ToArray());
            m_logger.LogInformation($"Добавлено {newUsersCount} новых игроков");
            m_logger.LogInformation($"Обновлено {updateUsersCount} игроков");
        }

        private void InsertExperience(IWorkerContext dc) {
            var users = dc.GetAllUsers().ToList();
            var updateExperience = new List<ExperienceEntity>();
            var today = new DateTime(2021, 4, 11).Date;

            foreach (var collection in InspectCollection) {
                foreach (var user in collection.Users) {
                    updateExperience.Add(new ExperienceEntity {
                        CityId = collection.CityId,
                        Date = today,
                        UserId = users.Single(x => x.UserId == user.UserId).Id,
                        Xp = user.Xp
                    });
                }
            }

            dc.InsertRangeExperience(updateExperience.ToArray());

            dc.EqualizeExperience(today);

            m_logger.LogInformation($"Добавлено {updateExperience.Count} новых записей опыта");
        }

        private void Clear() {
            InspectCollection.Clear();
            m_logger.LogInformation($"Словари очищены!");
        }
    }
}
