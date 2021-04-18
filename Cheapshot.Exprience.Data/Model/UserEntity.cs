using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cheapshot.Exprience.Data.Model {
    [Table("users")]
    public class UserEntity : BaseEntity {
        [Column("userid")]
        public long UserId { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("userpic")]
        public string UserPic { get; set; }
        [Column("level")]
        public short Level { get; set; }

        public List<ExperienceEntity> ExperienceEntities { get; set; }

        [Column("visible")]
        public bool Visible { get; set; }
    }
}
