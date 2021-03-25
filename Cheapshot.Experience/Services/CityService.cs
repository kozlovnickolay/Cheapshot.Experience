using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;

namespace Cheapshot.Experience.Services {
    public class CityService : ICityService {
        private readonly CitiesRepository m_cities;

        public CityService(CitiesRepository cities) {
            m_cities = cities;
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

    }
}
