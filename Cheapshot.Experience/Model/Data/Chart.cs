using System;

namespace Cheapshot.Experience.Model.Data {
    public class Chart {
        public string Pic { get; set; }
        public string Name { get; set; }
        public DateTime[] Dates { get; set; }
        public int[] Levels { get; set; }
        public long[] DayValues { get; set; }
        public long[] Values { get; set; }
    }
}
