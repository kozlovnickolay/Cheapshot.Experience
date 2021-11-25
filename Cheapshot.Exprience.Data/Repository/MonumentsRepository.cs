using Cheapshot.Exprience.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cheapshot.Exprience.Data.Repository {
    public class MonumentsRepository : BaseRepository<MonumentEntity> {
        public MonumentsRepository(DataContext context) : base(context) { }

        public IQueryable<MonumentEntity> GetActiveMonuments() {
            return GetAll()
                .Where(d => d.Active == true);
        }

    }
}
