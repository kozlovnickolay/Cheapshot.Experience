using Cheapshot.Exprience.Data.Model;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository {
    public class RequestsRepository : BaseRepository<RequestEntity> {
        public RequestsRepository(DataContext context) : base(context) { }

    }
}
