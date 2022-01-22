using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Model.Data {
    public class Chart {
        public string Pic { get; set; }
        public string Name { get; set; }
        public string[] Labels { get; set; }
        public int[] Levels { get; set; }
        public long[] Series { get; set; }
    }
}
