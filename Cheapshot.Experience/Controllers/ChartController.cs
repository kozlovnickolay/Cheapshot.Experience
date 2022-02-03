using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ChartController : ControllerBase {

        private readonly ILogger<ChartController> _logger;
        private readonly ITopService m_service;


        public ChartController(ILogger<ChartController> logger, ITopService service) {
            _logger = logger;
            m_service = service;
        }


        [HttpGet]
        public object GetChart(Guid userId, DateTime? startDate, DateTime? endDate) {
            return m_service.GetPeriodChart(userId, startDate, endDate);
        }
    }
}
