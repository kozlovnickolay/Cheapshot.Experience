using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class DateController : ControllerBase {

        private readonly ILogger<DateController> _logger;
        private readonly ITopService m_service;


        public DateController(ILogger<DateController> logger, ITopService service) {
            _logger = logger;
            m_service = service;
        }

        [HttpGet]
        public DateTime Get(string type) {
            return m_service.GetMaxMinDate(type);
        }
    }
}
