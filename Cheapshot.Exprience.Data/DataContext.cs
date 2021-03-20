using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Cheapshot.Exprience.Data {
    public class DataContext : DbContext {

        public DbSet<CityEntity> Cities { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ExperienceEntity> Eperiences { get; set; }


        public DataContext(DbContextOptions<DataContext> options) : base(options) {
        }

    }

}