using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cheapshot.Exprience.Data.Model {
    [Table("statistics")]
    public class StatisticsEntity : BaseEntity {
        [Column("records")]
        public int Records { get; set; }
        [Column("date", TypeName = "date")]
        public DateTime Date { get; set; }
        [Column("time")]
        public double Time { get; set; }
    }
}