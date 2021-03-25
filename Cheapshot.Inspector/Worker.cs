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

        private List<UserEntity> Users { get; set; }

        private Timer m_timer;

        public Worker(ILogger<Worker> logger, IServiceScopeFactory scopeFactory) {
            m_scopeFactory = scopeFactory;
            m_logger = logger;
            m_inspectService = new InspectService();
            InspectCollection = new List<InspectCollection>();

        }

        public void GetNewData(object state) {
            using (var scope = m_scopeFactory.CreateScope()) {
                var dc = scope.ServiceProvider.GetService<IWorkerContext>();
                var cities = dc.GetAllCities();

                foreach (var city in cities) {
                    DownloadUsersFromInspectByCity(city);
                }
                UpdateUsers(dc);
                InsertExperience(dc);
                Clear();
            }
        }


        public Task StartAsync(CancellationToken cancellationToken) {
            m_logger.LogInformation("Timed Background Service is starting.");

            //m_timer = new Timer(GetNewData, null, TimeSpan.Zero, TimeSpan.FromSeconds(3600));

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

            var newUsers = new List<UserEntity>();
            var updateUsers = new List<UserEntity>();

            foreach (var collection in InspectCollection) {
                foreach (var user in collection.Users) {
                    var oldUser = existingUsers.FirstOrDefault(x => x.UserId == user.UserId);
                    if (oldUser != null) {
                        oldUser.Name = user.Name;
                        oldUser.UserPic = user.Userpic;
                        oldUser.Level = user.Level;
                        updateUsers.Add(oldUser);
                    } else {
                        newUsers.Add(new UserEntity {
                            Level = user.Level,
                            Name = user.Name,
                            UserId = user.UserId,
                            UserPic = user.Userpic
                        });
                    }
                }
            }

            dc.InsertRangeUsers(newUsers.ToArray());
            m_logger.LogInformation($"Добавлено {newUsers.Count} новых игроков");

            dc.UpdateRangeUsers(updateUsers.ToArray());
            m_logger.LogInformation($"Обновлено {updateUsers.Count} игроков");


            Users = dc.GetAllUsers().ToList();
        }

        private void InsertExperience(IWorkerContext dc) {
            var updateExperience = new List<ExperienceEntity>();

            foreach (var collection in InspectCollection) {
                foreach (var user in collection.Users) {
                    updateExperience.Add(new ExperienceEntity {
                        CityId = collection.CityId,
                        Date = DateTime.Now.Date,
                        UserId = Users.First(x => x.UserId == user.UserId).Id,
                        Xp = user.Xp
                    });
                }
            }

            dc.InsertRangeExperience(updateExperience.ToArray());
            m_logger.LogInformation($"Добавлено {updateExperience.Count} новых записей опыта");

        }

        private void Clear() {
            InspectCollection.Clear();
            Users.Clear();
            m_logger.LogInformation($"Словари очищены!");

        }
    }
}
