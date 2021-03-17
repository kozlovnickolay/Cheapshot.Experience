using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cheapshot.Exprience.Data {
    public class DataContext : DbContext {

        public DbSet<CityEntity> Cities { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ExperienceEntity> Eperiences { get; set; }


        public DataContext(DbContextOptions<DataContext> options) : base(options) {
        }

        public int SaveChangesAsync() {
            return base.SaveChanges();
        }

        public DbSet<T> DbSet<T>() where T : class {
            return Set<T>();
        }

        public IQueryable<T> Query<T>() where T : class {
            return Set<T>();
        }

        internal void UpdateRange<T>(IEnumerable<T> entities) where T : class, IEntity {
            throw new NotImplementedException();
        }
    }
}
