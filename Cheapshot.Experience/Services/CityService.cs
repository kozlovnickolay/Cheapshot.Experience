using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Services {
    public class CityService : ICityService {
        private readonly IDbRepository m_dbRepository;

        public CityService(IDbRepository dbRepository) {
            m_dbRepository = dbRepository;
        }

        public City[] GetAllCities() {
            var cityEntities = m_dbRepository.GetAll<CityEntity>();
            var cities = new List<City>();
            foreach (var c in cityEntities) {
                var city = new City() {
                    id = c.Id,
                    name = c.Name,
                    points = c.Points
                };
                cities.Add(city);
            }

            return cities.ToArray();
        }

        public City GetById(Guid id) {
            throw new NotImplementedException();
        }
    }
}
