using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Model.Data {
    public class Monument {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Pic { get; set; }
        public string Location { get; set; }
        public string Difficulty { get; set; }
        public bool Active { get; set; }
    }
}
