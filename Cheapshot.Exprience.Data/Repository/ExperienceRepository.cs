using Cheapshot.Exprience.Data.Model;


namespace Cheapshot.Exprience.Data.Repository {
    public class ExperienceRepository : BaseRepository<ExperienceEntity> {

        public ExperienceRepository(DataContext context) : base(context) { }

    }
}
