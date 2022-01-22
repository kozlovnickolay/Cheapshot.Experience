using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cheapshot.Experience.Services {
    public class TopService : ITopService {
        private readonly ExperienceRepository m_exp;

        public TopService(ExperienceRepository exp) {
            m_exp = exp;
        }

        public IEnumerable<Top> GetTopPlayersByCityId(Guid cityId) {
            IQueryable<ExperienceEntity> top;
            var maxDate = m_exp.GetAll().Max(x => x.Date);

            if (cityId != Guid.Empty)
                top = m_exp.GetTopExperience(maxDate, cityId);
            else
                top = m_exp.GetTopExperience(maxDate);

            return GetTopFromSearch(top).Take(1000);
        }

        public DateTime GetMaxMinDate(string type) {
            if (type == "max")
                return m_exp.GetAll().Max(x => x.Date).Date;
            else if (type == "min")
                return m_exp.GetAll().Min(x => x.Date).Date;
            else
                return DateTime.UtcNow.Date;
        }

        IEnumerable<Top> GetTopFromSearch(IQueryable<ExperienceEntity> search) {
            return search
                .Select(x => new Top {
                    Pic = x.User.UserPic,
                    Name = x.User.Name,
                    Level = x.Level,
                    Xp = x.Xp,
                    UserId = x.UserId
                })
                .Distinct()
                .ToList()
                .OrderByDescending(x => x.Xp);
        }

        public string[] GetCitiesByUserId(Guid userId) {
            var endDate = m_exp.GetAll().Max(x => x.Date);

            var cities = m_exp.GetCitiesByUserId(endDate, userId);

            return cities
                .Select(x => x.City)
                .OrderBy(x => x.Country)
                .OrderBy(x => x.Name)
                .Select(x => $"{ x.Flag} {x.Name}")
                .Distinct()
                .ToArray();
        }
        public Chart GetPeriodChart(Guid userId, DateTime min, DateTime max) {

            var query = m_exp.GetChart(min, max, userId)
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

            var days = query.GroupBy(x => new { x.Name, x.Pic })
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
                Labels = new string[days.Values.Length-1],
                Levels = new int[days.Values.Length-1],
                Series = new long[days.Values.Length-1]
            };

            int i = 1;

            foreach (var day in days.Values) {
                if (i < days.Values.Length) {
                    chart.Labels[i - 1] = day.Date.AddDays(1).ToShortDateString();
                    chart.Levels[i - 1] = day.Level;
                    chart.Series[i - 1] = days.Values[i].Xp - day.Xp;
                }
                i++;
            }
            return chart;
        }


        public IEnumerable<Top> GetRangeTopPlayersByCityId(Guid cityId, DateTime startDate, DateTime endDate) {
            IQueryable<ExperienceEntity> endTop;
            IQueryable<ExperienceEntity> startTop;

            if (endDate == null) {
                endDate = m_exp.GetAll().Max(x => x.Date);
            }

            if (cityId != Guid.Empty) {
                startTop = m_exp.GetTopExperience(startDate, cityId);
                endTop = m_exp.GetTopExperience(endDate, cityId);
            } else {
                startTop = m_exp.GetTopExperience(startDate);
                endTop = m_exp.GetTopExperience(endDate);
            }

            return GetDifferenceFromTops(endTop, startTop);
        }

        IEnumerable<Top> GetDifferenceFromTops(IQueryable<ExperienceEntity> end, IQueryable<ExperienceEntity> start) {
            var endResults = GetTopFromSearch(end).ToArray();
            var startResults = GetTopFromSearch(start).ToArray();
            var diff = new List<Top>();

            foreach (var endResult in endResults) {
                var startEntry = startResults.FirstOrDefault(x => x.UserId == endResult.UserId);

                if (startEntry != null && startEntry.Xp != endResult.Xp) {
                    endResult.Xp = endResult.Xp - startEntry.Xp;
                    endResult.LevelCount = endResult.Level - startEntry.Level;
                    diff.Add(endResult);
                }

            }
            return diff.OrderByDescending(x => x.Xp);

        }

    }
}