using Cheapshot.Exprience.Data.Model;
using Cheapshot.Inspector.Api;
using Cheapshot.Inspector.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Cheapshot.Inspector {
    public class Worker : IHostedService, IDisposable {
        private readonly InspectService m_inspectService;
        private readonly ILogger<Worker> m_logger;
        private readonly IServiceScopeFactory m_scopeFactory;


        private Timer m_timer;

        public Worker(ILogger<Worker> logger, IServiceScopeFactory scopeFactory) {
            m_scopeFactory = scopeFactory;
            m_logger = logger;
            m_inspectService = new InspectService();
        }

        public void GetNewData(object state) {
            using (var scope = m_scopeFactory.CreateScope()) {
                var m_dc = scope.ServiceProvider.GetService<IWorkerContext>();
                var cities = m_dc.GetAllCities();

                foreach (var city in cities) {
                    m_logger.LogInformation($"Загрузка города: {city.Name}");
                    var usersId = new List<long>();
                    var i = 0;
                    foreach (var point in city.Locations) {
                        i++;
                        m_logger.LogInformation($"{i}) загрузка точки: {point.lat}, {point.lon}");
                        var url = ApiHelper.GetInspectUrl(point.lat, point.lon);
                        var inspect = m_inspectService.GetInspect(url);
                        if (inspect != null) {
                            m_logger.LogInformation($"{i}) найдено {inspect.Users.Values.Count} игроков");

                            foreach (var user in inspect.Users.Values) {
                                if (user.Role == "user" && !usersId.Contains(user.UserId)) {
                                    var userEntity = new UserEntity {
                                        UserId = user.UserId,
                                        Level = user.Level,
                                        Name = user.Name,
                                        UserPic = user.Userpic
                                    };
                                    usersId.Add(user.UserId);

                                    var userId = m_dc.InsertOrUpdateUser(userEntity);

                                    var xpEntity = new ExperienceEntity {
                                        CityId = city.Id,
                                        Date = DateTime.Now.Date,
                                        UserId = userId,
                                        Xp = user.Xp
                                    };
                                    m_dc.InsertXpData(xpEntity);
                                }
                            }
                        }
                    }
                }
            }
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
    }
}
