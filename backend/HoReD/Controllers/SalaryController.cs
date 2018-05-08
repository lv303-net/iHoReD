using System;
using System.Collections.Generic;
using System.Web.Http;
using Entities;
using Entities.Services;

namespace HoReD.Controllers
{
    /// <summary>
    /// Controller manages salary management
    /// </summary>

    public class SalaryController : ApiController
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpGet]
        [Route("GetRatesForProfession/{professionId}")]
        public IHttpActionResult GetRatesForProfession(int professionId)
        {
            return Ok(_salaryService.GetRatesForProfession(professionId));
        }
    }
}