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

        Top MapFromSearch(SearchResults s) {
            return new Top {
                Level = s.Level,
                Name = s.Name,
                Pic = s.Pic,
                Xp = s.Xp,
                UserId = s.Id
            };
        }
        public IEnumerable<Top> GetTopPlayersByCityId(Guid cityId) {
            IQueryable<ExperienceEntity> top;
            var maxDate = m_exp.GetAll().Max(x => x.Date);

            if (cityId != Guid.Empty)
                top = m_exp.GetTopExperience(maxDate, cityId);
            else
                top = m_exp.GetTopExperience(maxDate);

            return GetTopFromSearch(top);
        }


        IEnumerable<Top> GetTopFromSearch(IQueryable<ExperienceEntity> search) {
            var result = search
                .Select(x => new SearchResults {
                    Pic = x.User.UserPic,
                    Name = x.User.Name,
                    Id = x.UserId,
                    Level = x.User.Level,
                    Xp = x.Xp,
                    City = x.City.Name
                })
                .ToList();

            var grouped = result
                .GroupBy(x => new { x.Id, x.City })
                .Select(x => new {
                    x.Key.Id,
                    x.Key.City,
                    entry = MapFromSearch(x.OrderByDescending(x => x.Xp).First())
                })
                .OrderBy(x => x.City)
                .GroupBy(x => x.Id)
                .Select(x => AddCitiesToResultEntry(
                    x.Select(y => y.entry).First(),
                    string.Join(", ", x.Select(y => y.City).OrderBy(o => o))
                    ))
                .OrderByDescending(x => x.Xp)
                .Take(1000);
            return grouped;
        }



        private class SearchResults {
            public string Pic { get; set; }
            public string Name { get; set; }
            public Guid Id { get; set; }
            public int Level { get; set; }
            public long Xp { get; set; }
            public string City { get; set; }
        }

        Top AddCitiesToResultEntry(Top e, string c) {
            e.Cities = c;
            return e;
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
                    diff.Add(endResult);
                }

            }
            return diff.OrderByDescending(x => x.Xp);

        }


    }
}
