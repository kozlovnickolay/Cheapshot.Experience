using System.Text.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cheapshot.Exprience.Data.Model {
    [Table("city")]
    public class CityEntity : BaseEntity {
        [Column("name")]
        public string Name { get; set; }
        [Column("points")]
        public string Points { get; set; }
        [NotMapped]
        public Location[] Locations => JsonSerializer.Deserialize<Location[]>(Points);

    }
}