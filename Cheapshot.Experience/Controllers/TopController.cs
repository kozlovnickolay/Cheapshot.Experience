using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class TopController : ControllerBase {

        private readonly ILogger<TopController> _logger;
        private readonly ITopService m_service;


        public TopController(ILogger<TopController> logger, ITopService service) {
            _logger = logger;
            m_service = service;
        }

        [HttpGet]
        public object Get(Guid cityId, DateTime startDate, DateTime dateTime) {
            return m_service.GetTopPlayersByCityId(cityId);
        }
    }
}
