using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cheapshot.Exprience.Data.Model {
    [Table("experience")]
    public class ExperienceEntity : BaseEntity {
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("xp")]
        public long Xp { get; set; }
        [Column("userid")]
        public Guid UserId { get; set; }
        public UserEntity User { get; set; }
        [Column("cityid")]
        public Guid CityId { get; set; }
        public CityEntity City { get; set; }
        [Column("level")]
        public short Level { get; set; }
    }
}