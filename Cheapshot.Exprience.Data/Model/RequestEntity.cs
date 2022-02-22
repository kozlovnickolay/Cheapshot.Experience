using System.ComponentModel.DataAnnotations.Schema;

namespace Cheapshot.Exprience.Data.Model {
    [Table("requests")]
    public class RequestEntity : BaseEntity {
        [Column("name")]
        public string Name { get; set; }
        [Column("pic")]
        public string Pic { get; set; }
        [Column("location")]
        public string Location { get; set; }
        [Column("city")]
        public string City { get; set; }
        [Column("country")]
        public string Country { get; set; }
        [Column("story")]
        public string Story { get; set; }
    }
}
