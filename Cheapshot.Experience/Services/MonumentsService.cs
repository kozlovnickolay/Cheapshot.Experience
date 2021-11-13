using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Services {
    public class MonumentsService : IMonumentService {

        private readonly MonumentsRepository m_monuments;

        public MonumentsService(MonumentsRepository monuments) {
            m_monuments = monuments;
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
