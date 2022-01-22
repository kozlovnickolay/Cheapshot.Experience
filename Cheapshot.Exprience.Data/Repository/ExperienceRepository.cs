using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository {
    public class ExperienceRepository : BaseRepository<ExperienceEntity> {

        public ExperienceRepository(DataContext context) : base(context) { }

        public IQueryable<ExperienceEntity> GetTopExperience(DateTime date) {
            return GetAll()
                .Include(x => x.User)
                .Where(d => d.Date == date && d.User.Visible == true);
        }

        public IQueryable<ExperienceEntity> GetTopExperience(DateTime date, Guid cityId) {
            return GetAll()
                .Include(x => x.User)
                .Where(d => d.Date == date && d.CityId == cityId && d.User.Visible == true);
        }

        public IQueryable<ExperienceEntity> GetCitiesByUserId(DateTime date, Guid userId) {
            return GetAll()
                .Include(x => x.City)
                .Where(d => d.Date == date && d.UserId == userId);
        }

        public IQueryable<ExperienceEntity> GetChart(DateTime min,DateTime max,  Guid userId) {
            return GetAll()
                .Include(x => x.User)
                .Where(d => d.Date >= min &&  d.Date <= max && d.UserId == userId);
        }

    }
}