using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Services {
    public class MonumentsService : IMonumentService {

        private readonly MonumentsRepository m_monuments;
        private readonly RequestsRepository m_requests;

        public MonumentsService(MonumentsRepository monuments, RequestsRepository requests) {
            m_monuments = monuments;
            m_requests = requests;
        }

        public Guid CreateRequest(Request request) {
            var requestEntity = new RequestEntity {
                City = request.City,
                Country = request.Country,
                Location = request.Location,
                Name = request.Name,
                RequestDate = DateTime.UtcNow,
                Pic = request.Pic,
                Story = request.Story
            };

            var id = m_requests.Add(requestEntity);
            m_requests.SaveChanges();
            return id;
        }

        public MonumentGroup[] GetActiveMonumentGroups() {

            var monuments = m_monuments.GetActiveMonuments().ToList().OrderBy(x => x.City);

            var monumentGroup = monuments
                .GroupBy(x => x.Tag)
                .Select(x => new MonumentGroup {
                    Tag = x.Key,
                    Monuments = x.Select(m => new Monument {
                        Id = m.Id,
                        Name = m.Name,
                        Pic = m.Pic,
                        Location = m.Location,
                        Active = m.Active,
                        Difficulty = m.Stars
                    }).ToArray()
                }).ToArray();
            return monumentGroup;
        }

    }
}
