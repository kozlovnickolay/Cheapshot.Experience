using Cheapshot.Exprience.Data.Model;
using System;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository {
    public class DailyCacheRepository : BaseRepository<DailyCacheEntity> {

        public DailyCacheRepository(DataContext context) : base(context) {
        }

        public DailyCacheEntity GetRecordCache(DateTime from, DateTime to, Guid cityId) {
            return Get(x => x.From == from && x.To == to && x.CityId == cityId).FirstOrDefault();
        }

        public Top[] GetTopCache(DateTime from, DateTime to, Guid cityId) {
            return Get(x => x.From == from && x.To == to && x.CityId == cityId).Select(x => x.Cache).FirstOrDefault();
        }
    }
}