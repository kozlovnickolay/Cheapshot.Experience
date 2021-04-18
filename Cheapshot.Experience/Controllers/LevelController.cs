using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class LevelController : ControllerBase {

        private readonly ILogger<LevelController> _logger;
        private readonly ITopService m_service;


        public LevelController(ILogger<LevelController> logger, ITopService service) {
            _logger = logger;
            m_service = service;
        }

        [HttpGet]
        public object Get(Guid cityId) {
            return m_service.GetTopPlayersByCityId(cityId);
        }
    }
}
