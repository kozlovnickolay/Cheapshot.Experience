using System.Text.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Cheapshot.Exprience.Data.Model {
    [Table("dailycache")]
    public class DailyCacheEntity : BaseEntity {
        [Column("from")]
        public DateTime From { get; set; }
        [Column("to")]
        public DateTime To { get; set; }
        [NotMapped]
        public Top[] Cache {
            get {
                return JsonSerializer.Deserialize<Top[]>(CacheRaw);
            }
            set {
                CacheRaw = JsonSerializer.Serialize(value);
            }
        }
        [Column("cache", TypeName = "json")]
        public string CacheRaw { get; set; }
        [Column("cityid")]
        public Guid CityId { get; set; }
    }
}