using Cheapshot.Experience.Model.Data;
using System;

namespace Cheapshot.Experience.Services {
    public interface ICityService {
        City[] GetAllCities();
        City[] GetCitiesByCountry(string country);

        CountryGroup[] GetAllCountries();

        City GetById(Guid id);
    }
}
