using Cheapshot.Exprience.Data.Model;
using System.Linq;


namespace Cheapshot.Exprience.Data.Repository {
    public class CitiesRepository : BaseRepository<CityEntity> {

        public CitiesRepository(DataContext context) : base(context) {
        }

        public IQueryable<CityEntity> GetByCountry(string country) {
            return Get(x => x.Country == country);
        }

        public IQueryable<CityEntity> GetActiveCities() {
            return Get(x => x.Active);
        }
    }
}
