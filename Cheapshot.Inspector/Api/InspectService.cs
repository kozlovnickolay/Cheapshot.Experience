using Cheapshot.Inspector.Model;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Net;

namespace Cheapshot.Inspector.Api {
    public class InspectService{

        public Inspect GetInspect(string url) {
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Accept = "application/json";

            try {

                var response = (HttpWebResponse)request.GetResponse();
                var resStream = response.GetResponseStream();
                return DeserializeFromStream(resStream);

            } catch (WebException e) {
                var resp = new StreamReader(e.Response.GetResponseStream()).ReadToEnd();
                return null;
            }

        }

        public User[] GetUsers(string url) {
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Accept = "application/json";

            try {
                var response = (HttpWebResponse)request.GetResponse();
                var resStream = response.GetResponseStream();
                return DeserializeFromStream(resStream).Users.Values.ToArray();

            } catch {
                return new User[0];
            }

        }

        Inspect DeserializeFromStream(Stream stream) {
            var serializer = new JsonSerializer();

            using (var sr = new StreamReader(stream))
            using (var jsonTextReader = new JsonTextReader(sr)) {
                return serializer.Deserialize<Inspect>(jsonTextReader);
            }
        }
    }
}
