using Newtonsoft.Json;

namespace Cheapshot.Inspector.Model {
    public partial class Builder {
        [JsonProperty("UserID")]
        public long UserId { get; set; }

        [JsonProperty("Buildings")]
        public Buildings Buildings { get; set; }

        [JsonProperty("Cost")]
        public long Cost { get; set; }

        [JsonProperty("Value")]
        public long Value { get; set; }

        [JsonProperty("ValueMax")]
        public long ValueMax { get; set; }

        [JsonProperty("Score")]
        public long Score { get; set; }
    }
}
