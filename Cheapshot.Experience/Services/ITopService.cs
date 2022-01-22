using Cheapshot.Experience.Model.Data;
using System;
using System.Collections.Generic;

namespace Cheapshot.Experience.Services {
    public interface ITopService {
        IEnumerable<Top> GetTopPlayersByCityId(Guid cityId);

        IEnumerable<Top> GetRangeTopPlayersByCityId(Guid cityId, DateTime startDate, DateTime endDate);

        DateTime GetMaxMinDate(string type);

        string[] GetCitiesByUserId(Guid userId);

        Chart GetPeriodChart(Guid userId, DateTime min, DateTime max);

    }
}
