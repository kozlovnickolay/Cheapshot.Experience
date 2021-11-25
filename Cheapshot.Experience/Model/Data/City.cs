using Cheapshot.Exprience.Data.Model;
using System;

namespace Cheapshot.Experience.Model.Data {
    public class City {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Location[] Points { get; set; }
    }
}
