using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
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

        public object GetMaxExp() {
            var maxExp = m_exp.GetAll().Join(m_cities.GetAll(),
                e => e.CityId,
                c => c.Id,
                (e, c) => new {
                    c,
                    e
                }).Join(m_users.GetAll(),
                ec => ec.e.UserId,
                u => u.Id,
                (ec, u) => new {
                    u.UserPic,
                    u.Name,
                    u.Level,
                    ec.e.Xp,
                    city = ec.c.Name
                }).Distinct();
            return maxExp;

        }
    }
}
