using Cheapshot.Experience.Model.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Services {
   public interface IMonumentService {
        MonumentGroup[] GetActiveMonumentGroups();
    }
}
