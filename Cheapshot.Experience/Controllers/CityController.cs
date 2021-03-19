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
    public class CityController : ControllerBase {

        private readonly ILogger<CityController> _logger;
        private readonly ICityService m_service;


        public CityController(ILogger<CityController> logger, ICityService service) {
            _logger = logger;
            m_service = service;
        }

        [HttpGet]
        public object Get() {
            return m_service.GetMaxExp();// GetAllCities();
        }
    }
}
