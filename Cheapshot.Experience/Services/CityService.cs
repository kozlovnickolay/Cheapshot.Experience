using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Services {
    public class CityService : ICityService {
        private readonly CitiesRepository m_cities;

        private readonly ExperienceRepository m_exp;

        private readonly UsersRepository m_users;


        public CityService(CitiesRepository cities, ExperienceRepository exp, UsersRepository users) {
            m_cities = cities;
            m_exp = exp;
            m_users = users;
        }

        public City[] GetAllCities() {
            var cityEntities = m_cities.GetAll();
            var cities = new List<City>();
            foreach (var c in cityEntities) {
                cities.Add(MapModel(c));
            }

            return cities.ToArray();
        }

        public City GetById(Guid id) {
            return MapModel(m_cities.GetById(id));
        }

        City MapModel(CityEntity c) {
            return new City { Id = c.Id, Name = c.Name };
        }

        ResultEntry mapFromSearch(SearchEntry s) {
            return new ResultEntry {
                level = s.level,
                name = s.name,
                pic = s.pic,
                xp = s.xp
            };
        }
        public object GetMaxExp() {
            var maxDate = m_exp.GetAll().Max(x => x.Date);
            var result = m_exp.GetAll()
                .Include(x => x.City)
                .Include(x => x.User)
                .Where(d => d.Date == maxDate)
                .Select(x => new SearchEntry {
                    pic = x.User.UserPic,
                    name = x.User.Name,
                    id = x.UserId,
                    level = x.User.Level,
                    xp = x.Xp,
                    city = x.City.Name
                })
                .ToList();

            var grouped = result
                .GroupBy(x => new { x.id, x.city })
                .Select(x => new {
                    x.Key.id,
                    x.Key.city,
                    entry = mapFromSearch(x.OrderByDescending(x => x.xp).First())
                })
                .OrderBy(x => x.city)
                .GroupBy(x => x.id)
                .Select(x => addCitiesToResultEntry(
                    x.Select(y => y.entry).First(),
                    string.Join(", ", x.Select(y => y.city).OrderBy(o => o))
                    ))
                .OrderByDescending(x => x.xp)
                .Take(1000);
            return grouped;

        }

        private class SearchEntry {
            public string pic { get; set; }
            public string name { get; set; }

            public Guid id { get; set; }
            public int level { get; set; }

            public long xp { get; set; }
            public string city { get; set; }
        }

        public class ResultEntry {
            public string pic { get; set; }
            public string name { get; set; }
            public int level { get; set; }
            public long xp { get; set; }
            public string cities { get; set; }
        }

        ResultEntry addCitiesToResultEntry(ResultEntry e, string c) {
            e.cities = c;
            return e;
        }
    }
}
