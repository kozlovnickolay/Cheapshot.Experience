using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cheapshot.Inspector.Model {
    public partial class Credits {
        [JsonProperty("Count")]
        public long Count { get; set; }

        [JsonProperty("Value")]
        public long Value { get; set; }
    }
}
