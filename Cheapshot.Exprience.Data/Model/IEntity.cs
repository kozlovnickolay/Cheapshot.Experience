using System;
using System.Collections.Generic;
using System.Text;

namespace Cheapshot.Exprience.Data.Model {
    public interface IEntity {
        Guid Id { get; set; }
    }
}
