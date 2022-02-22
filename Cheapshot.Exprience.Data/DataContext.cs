using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Cheapshot.Exprience.Data
{
    public class DataContext : DbContext
    {

        public DbSet<CityEntity> Cities { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ExperienceEntity> Eperiences { get; set; }
        public DbSet<MonumentEntity> Monuments { get; set; }
        public DbSet<StatisticsEntity> Statistics { get; set; }
        public DbSet<DailyCacheEntity> DailyCache { get; set; }
        public DbSet<RequestEntity> Requests { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

    }

}