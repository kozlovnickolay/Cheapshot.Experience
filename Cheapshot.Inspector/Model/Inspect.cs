using Newtonsoft.Json;
using System.Collections.Generic;

namespace Cheapshot.Inspector.Model {
    public partial class Inspect {
        [JsonProperty("Cells")]
        public long Cells { get; set; }

        [JsonProperty("AreaSqkm")]
        public double AreaSqkm { get; set; }

        [JsonProperty("Users")]
        public Dictionary<string, User> Users { get; set; }

        [JsonProperty("Builders")]
        public Dictionary<string, Builder> Builders { get; set; }

        [JsonProperty("Credits")]
        public Credits Credits { get; set; }

        [JsonProperty("Upgrades")]
        public object[] Upgrades { get; set; }
    }
}
