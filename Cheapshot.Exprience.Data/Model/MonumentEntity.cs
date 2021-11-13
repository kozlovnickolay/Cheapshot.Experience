using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cheapshot.Exprience.Data.Model {
    [Table("monuments")]
    public class MonumentEntity : BaseEntity {
        [Column("name")]
        public string Name { get; set; }
        [Column("pic")]
        public string Pic { get; set; }
        [Column("location")]
        public string Location { get; set; }
        [NotMapped]
        public string Stars {
            get {
                var stars = "";
                for (var i = 0; i < Difficulty; i++) {
                    stars += "⭐️";
                }
                return stars;
            }
        }
        [Column("difficulty")]
        public int Difficulty { get; set; }
        [Column("city")]
        public string City { get; set; }
        [Column("country")]
        public string Country { get; set; }
        [Column("active")]
        public bool Active { get; set; }
        [Column("tag")]
        public string Tag { get; set; }
    }
}
