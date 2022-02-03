using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cheapshot.Experience.Services {
    public class TopService : ITopService {
        private readonly ExperienceRepository m_exp;
        private readonly StatisticsRepository m_stats;
        private readonly DailyCacheRepository m_cache;
        private readonly CitiesRepository m_cities;



        public TopService(ExperienceRepository exp, StatisticsRepository stats, DailyCacheRepository cache, CitiesRepository cities) {
            m_exp = exp;
            m_stats = stats;
            m_cache = cache;
            m_cities = cities;
        }

        public Top[] GetTopPlayers(Guid cityId) {

            if (cityId != Guid.Empty && m_cities.Get(x => x.Id == cityId).FirstOrDefault() == null)
                cityId = Guid.Empty;

            var maxDate = m_stats.GetMaxDate();
            var topCache = m_cache.GetTopCache(maxDate, maxDate, cityId);

            if (topCache != null) {
                return topCache;
            } else {
                IQueryable<ExperienceEntity> topQuery;

                if (cityId != Guid.Empty)
                    topQuery = m_exp.GetTopExperience(maxDate, cityId).Take(1000);
                else
                    topQuery = m_exp.GetTopExperience(maxDate).Take(1000);

                var top = MapEntityToTop(topQuery);

                m_cache.Add(new DailyCacheEntity { CityId = cityId, From = maxDate, To = maxDate, Cache = top });
                m_cache.SaveChanges();
                return top;
            }
        }

        private Top[] MapEntityToTop(IQueryable<ExperienceEntity> query) {
            return query.Select(x => new Top {
                Level = x.Level,
                Name = x.User.Name,
                UserId = x.User.Id,
                Pic = x.User.UserPic,
                Xp = x.Xp
            }).ToArray();
        }

        public DateTime GetMaxMinDate(string type) {
            if (type == "max")
                return m_stats.GetMaxDate();
            else if (type == "min")
                return m_stats.GetMinDate();
            else
                return DateTime.UtcNow.Date;
        }

        public string[] GetCitiesByUserId(Guid userId) {
            var endDate = m_stats.GetMaxDate();
            return m_exp.GetCitiesByUserId(endDate, userId);
        }

        public Chart GetPeriodChart(Guid userId, DateTime? min, DateTime? max) {

            if (!min.HasValue)
                min = GetMaxMinDate("min");
            if (!max.HasValue)
                max = GetMaxMinDate("max");

            var query = m_exp.GetChart(min.Value, max.Value, userId)
                .Select(x => new {
                    Date = x.Date,
                    Level = x.Level,
                    Name = x.User.Name,
                    Pic = x.User.UserPic,
                    Xp = x.Xp
                })
                .OrderBy(x => x.Date)
                .Distinct()
                .ToList();

            var days = query
                .GroupBy(x => new { x.Name, x.Pic })
                .Select(x => new {
                    x.Key.Pic,
                    x.Key.Name,
                    Values = x.Select(y => new {
                        y.Date,
                        y.Level,
                        y.Xp
                    }).ToArray()
                })
                .First();

            var chart = new Chart {
                Name = days.Name,
                Pic = days.Pic,
                Dates = new DateTime[days.Values.Length - 1],
                Levels = new int[days.Values.Length - 1],
                DayValues = new long[days.Values.Length - 1],
                Values = new long[days.Values.Length - 1]
            };

            int i = 1;

            foreach (var day in days.Values) {
                if (i < days.Values.Length) {
                    chart.Dates[i - 1] = day.Date.AddDays(1);
                    chart.Levels[i - 1] = day.Level;
                    chart.DayValues[i - 1] = days.Values[i].Xp - day.Xp;
                    chart.Values[i - 1] = days.Values[i].Xp;
                }
                i++;
            }
            return chart;
        }


        public Top[] GetRangeTop(Guid cityId, DateTime startDate, DateTime endDate) {
            if (cityId != Guid.Empty && m_cities.Get(x => x.Id == cityId).FirstOrDefault() == null)
                cityId = Guid.Empty;

            var minDate = GetMaxMinDate("min");
            var maxDate = GetMaxMinDate("max");

            if (endDate < startDate)
                return null;

            if (startDate < minDate || startDate > maxDate)
                return null;

            if (endDate < minDate || endDate > maxDate)
                return null;

            var cacheRecord = m_cache.GetRecordCache(startDate, endDate, cityId);

            if (cacheRecord != null) {
                if (cacheRecord.Cache.Length == 0) {
                    var range = ReadRangeTop(cityId, startDate, endDate);
                    cacheRecord.Cache = range;
                    m_cache.Update(cacheRecord);
                    m_cache.SaveChanges();
                }
                return cacheRecord.Cache;
            } else {
                var range = ReadRangeTop(cityId, startDate, endDate);
                m_cache.Add(new DailyCacheEntity { From = startDate, To = endDate, Cache = range, CityId = cityId });
                m_cache.SaveChanges();
                return range;
            }
        }

        Top[] ReadRangeTop(Guid cityId, DateTime startDate, DateTime endDate) {
            IQueryable<ExperienceEntity> endTop;
            IQueryable<ExperienceEntity> startTop;
            if (cityId != Guid.Empty) {
                startTop = m_exp.GetTopExperience(startDate, cityId);
                endTop = m_exp.GetTopExperience(endDate, cityId);
            } else {
                startTop = m_exp.GetTopExperience(startDate);
                endTop = m_exp.GetTopExperience(endDate);
            }
            return GetDifferenceFromTops(endTop, startTop);
        }


        Top[] GetDifferenceFromTops(IQueryable<ExperienceEntity> end, IQueryable<ExperienceEntity> start) {
            var endResults = MapEntityToTop(end);
            var startResults = MapEntityToTop(start);

            var diff = new List<Top>();

            foreach (var endResult in endResults) {
                var startEntry = startResults.FirstOrDefault(x => x.UserId == endResult.UserId);

                if (startEntry != null && startEntry.Xp != endResult.Xp) {
                    endResult.Xp = endResult.Xp - startEntry.Xp;
                    endResult.LevelCount = endResult.Level - startEntry.Level;
                    diff.Add(endResult);
                }

            }
            return diff.OrderByDescending(x => x.Xp).ToArray();
        }

    }
}