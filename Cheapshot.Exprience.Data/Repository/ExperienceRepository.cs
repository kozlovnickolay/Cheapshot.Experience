using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cheapshot.Exprience.Data.Repository {
    public class ExperienceRepository : BaseRepository<ExperienceEntity> {

        public ExperienceRepository(DataContext context) : base(context) { }

        public IQueryable<ExperienceEntity> GetTopExperience(DateTime date) {
            return m_dc.Set<ExperienceEntity>()
                .Include(x => x.User)
                .Where(d => d.Date == date && d.User.Visible == true)
                .Select(x => new ExperienceEntity {
                    User = x.User,
                    Xp = x.Xp,
                    Level = x.Level
                })
                .Distinct()
                .OrderByDescending(d => d.Xp)
                .AsQueryable();
        }

        public IQueryable<ExperienceEntity> GetTopExperience(DateTime date, Guid cityId) {
            return m_dc.Set<ExperienceEntity>()
                .Include(x => x.User)
                .Where(d => d.Date == date && d.CityId == cityId && d.User.Visible == true)
                .Select(x => new ExperienceEntity {
                    User = x.User,
                    Xp = x.Xp,
                    Level = x.Level
                })
                .Distinct()
                .OrderByDescending(d => d.Xp)
                .AsQueryable();
        }

        public string[] GetCitiesByUserId(DateTime date, Guid userId) {
            return m_dc.Set<ExperienceEntity>()
                .Include(x => x.City)
                .Where(d => d.Date == date && d.UserId == userId)
                .OrderBy(x => x.City.Country)
                .OrderBy(x => x.City.Name)
                .Select(x => $"{ x.City.Flag} {x.City.Name}")
                .ToArray();
        }

        public IQueryable<ExperienceEntity> GetChart(DateTime min, DateTime max, Guid userId) {
            return m_dc.Set<ExperienceEntity>()
                .Include(x => x.User)
                .Where(d => d.Date >= min && d.Date <= max && d.UserId == userId);
        }

    }
}