using System.Globalization;

namespace Cheapshot.Inspector.Api {
    public static class ApiHelper {

        public static string GetInspectUrl(double lat, double lon) => $"https://api.cheapshot.co/stats/zone/{DoubleToString(lat)}/{DoubleToString(lon)}?token={Resource.token}";

        private static string DoubleToString(double value) => value.ToString(CultureInfo.GetCultureInfo("en-US"));
    }
}
