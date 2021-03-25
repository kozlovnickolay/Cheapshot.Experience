using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository {
    public class ExperienceRepository : BaseRepository<ExperienceEntity> {

        public ExperienceRepository(DataContext context) : base(context) { }

        public IQueryable<ExperienceEntity> GetTopExperience(DateTime date) {
            return GetAll()
                .Include(x => x.City)
                .Include(x => x.User)
                .Where(d => d.Date == date);
        }

        public IQueryable<ExperienceEntity> GetTopExperience(DateTime date,Guid cityId) {
            return GetAll()
                .Include(x => x.City)
                .Include(x => x.User)
                .Where(d => d.Date == date && d.CityId == cityId);
        }

    }
}
