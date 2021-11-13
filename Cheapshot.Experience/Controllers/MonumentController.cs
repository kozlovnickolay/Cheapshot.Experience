using Cheapshot.Experience.Model.Data;
using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class MonumentController : ControllerBase {

        private readonly ILogger<MonumentController> _logger;
        private readonly IMonumentService m_service;


        public MonumentController(ILogger<MonumentController> logger, IMonumentService service) {
            _logger = logger;
            m_service = service;
        }

        [HttpGet]
        public MonumentGroup[] Get() {
            return m_service.GetActiveMonumentGroups();
        }

    }
}
