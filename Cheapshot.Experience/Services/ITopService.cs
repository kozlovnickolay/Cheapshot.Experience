using Cheapshot.Experience.Model.Data;
using Cheapshot.Exprience.Data.Model;
using System;

namespace Cheapshot.Experience.Services {
    public interface ITopService {
        Top[] GetTopPlayers(Guid cityId);

        Top[] GetRangeTop(Guid cityId, DateTime startDate, DateTime endDate);

        DateTime GetMaxMinDate(string type);

        string[] GetCitiesByUserId(Guid userId);

        Chart GetPeriodChart(Guid userId, DateTime min, DateTime max);

    }
}
