using Cheapshot.Exprience.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Cheapshot.Exprience.Data.Repository {
    public class CitiesRepository : BaseRepository<CityEntity> {

        public CitiesRepository(DataContext context) : base(context) {
        }

        public IQueryable<CityEntity> GetByCountry(string country) {
            return Get(x => x.Country == country);
        }

    }
}
