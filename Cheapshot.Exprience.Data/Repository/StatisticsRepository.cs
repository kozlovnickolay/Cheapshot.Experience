using Cheapshot.Exprience.Data.Model;
using System;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository
{
    public class StatisticsRepository : BaseRepository<StatisticsEntity>
    {
        public StatisticsRepository(DataContext context) : base(context)
        {
        }

        public DateTime GetMaxDate()
        {
            return GetAll().Max(x => x.Date).Date;
        }

        public DateTime GetMinDate()
        {
            return GetAll().Min(x => x.Date).Date;
        }
    }
}
