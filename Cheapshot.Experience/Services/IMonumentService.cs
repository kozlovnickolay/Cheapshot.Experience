using Cheapshot.Experience.Model.Data;
using System;

namespace Cheapshot.Experience.Services
{
    public interface IMonumentService
    {
        MonumentGroup[] GetActiveMonumentGroups();
        Guid CreateRequest(Request request);
    }
}
