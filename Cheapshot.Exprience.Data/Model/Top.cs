using System;

namespace Cheapshot.Exprience.Data.Model {
    public class Top {
        public string Pic { get; set; }
        public string Name { get; set; }
        public short Level { get; set; }
        public int LevelCount { get; set; }
        public long Xp { get; set; }
        public Guid UserId { get; set; }
    }
}
