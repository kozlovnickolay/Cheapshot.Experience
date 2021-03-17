using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cheapshot.Exprience.Data.Model {
    public class BaseEntity: IEntity {
        [Column("id")]
        public Guid Id { get; set; }
    }
}
