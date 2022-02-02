using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class RangeController : ControllerBase {

        private readonly ILogger<RangeController> _logger;
        private readonly ITopService m_service;


        public RangeController(ILogger<RangeController> logger, ITopService service) {
            _logger = logger;
            m_service = service;
        }

        [HttpGet]
        public object Get(Guid cityId, DateTime startDate, DateTime endDate) {
            return m_service.GetRangeTop(cityId, startDate, endDate);
        }
    }
}
