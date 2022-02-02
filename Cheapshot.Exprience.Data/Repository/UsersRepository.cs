using Cheapshot.Exprience.Data.Model;


namespace Cheapshot.Exprience.Data.Repository {
    public class UsersRepository : BaseRepository<UserEntity> {
        public UsersRepository(DataContext context) : base(context) {
        }
    }
}
