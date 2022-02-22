using Cheapshot.Exprience.Data.Model;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository {
    public class MonumentsRepository : BaseRepository<MonumentEntity> {
        public MonumentsRepository(DataContext context) : base(context) { }

        public IQueryable<MonumentEntity> GetActiveMonuments() {
            return Get(d => d.Active == true);
        }

    }
}
