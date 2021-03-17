using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cheapshot.Inspector.Model {
    public partial class User {
        [JsonProperty("UserID")]
        public long UserId { get; set; }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("Userpic")]
        public string Userpic { get; set; }

        [JsonProperty("XP")]
        public long Xp { get; set; }

        [JsonProperty("Level")]
        public short Level { get; set; }

        [JsonProperty("Role")]
        public string Role { get; set; }
    }
}
