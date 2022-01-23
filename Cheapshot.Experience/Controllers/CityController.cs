using Cheapshot.Experience.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace Cheapshot.Experience.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class CityController : ControllerBase {

        private readonly ILogger<CityController> _logger;
        private readonly ICityService m_cityService;
        private readonly ITopService m_topService;


        public CityController(ILogger<CityController> logger, ICityService cityService, ITopService topService) {
            _logger = logger;
            m_cityService = cityService;
            m_topService = topService;
        }

        [HttpGet]
        public object Get(string country) {
            if (string.IsNullOrEmpty(country))
                return m_cityService.GetAllCountries();
            else
                return m_cityService.GetCitiesByCountry(country);
        }

        [HttpGet("user/{userId}")]
        public object GetUserCities(Guid userId) {
            return m_topService.GetCitiesByUserId(userId);
        }
    }
}
