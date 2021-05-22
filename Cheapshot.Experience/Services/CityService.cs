using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

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
                cities.Add(MapCityModel(c));
            }
            return cities.ToArray();
        }

        public CountryGroup[] GetAllCountries() {
            var countries = m_cities.GetAll().ToList().OrderBy(x => x.Country);

            var countryGroup = countries
                .GroupBy(x => new { x.Flag, x.Country })
                .Select(x => new CountryGroup {
                    Name = $"{x.Key.Flag} {x.Key.Country}",
                    Cities = x.Select(c => new City {
                        Id = c.Id,
                        Name = c.Name,
                        Points = c.Locations
                    })
                    .OrderBy(c => c.Name)
                    .ToArray()
                })
                .ToArray();

            return countryGroup;
        }

        public City GetById(Guid id) {
            return MapCityModel(m_cities.GetById(id));
        }

        public City[] GetCitiesByCountry(string country) {
            var cityEntities = m_cities.GetByCountry(country);
            var cities = new List<City>();
            foreach (var c in cityEntities) {
                cities.Add(MapCityModel(c));
            }
            return cities.ToArray();
        }

        City MapCityModel(CityEntity c) {
            return new City { 
                Id = c.Id,
                Name = c.Name,
                Points = c.Locations
            };
        }
    }
}
