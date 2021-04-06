using System;

namespace Cheapshot.Experience.Model.Data {
    public class Top {
        public string Pic { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public long Xp { get; set; }
        public string Cities { get; set; }
        public Guid UserId { get; set; }
    }
}
