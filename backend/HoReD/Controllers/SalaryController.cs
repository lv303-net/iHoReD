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
        [Route("api/Salary/Rate/get/{professionId}")]
        public IHttpActionResult GetRatesForProfession(int professionId)
        {
            return Ok(_salaryService.GetRatesForProfession(professionId));
        }

        [HttpDelete]
        [Route("api/Salary/Rate/delete/{professionId}/{startDate}")]
        public IHttpActionResult DeleteRate(int professionId, string startDate)
        {
            return Ok(_salaryService.DeleteRate(professionId, Convert.ToDateTime(startDate)));
        }

        [HttpPost]
        [Route("api/Salary/Rate/add")]
        public IHttpActionResult AddNewRate(Models.SalaryRateBindingModel model)
        {            
            return Ok(_salaryService.AddRate(model.ProfessionId, model.Rate, model.StartDate));
        }

        [HttpPost]
        [Route("api/Salary/Rate/edit")]
        public IHttpActionResult EditNewRate(Models.SalaryRateBindingModel model)
        {
            return Ok(_salaryService.EditRate(model.ProfessionId, model.Rate, model.StartDate));
        }


        [HttpGet]
        [Route("api/Salary/Coefficient/get/{doctorId}")]
        public IHttpActionResult GetCoefficientsForDoctor(int doctorId)
        {
            return Ok(_salaryService.GetCoefficientsForDoctor(doctorId));
        }

        [HttpDelete]
        [Route("api/Salary/Coefficient/delete/{doctorId}/{startDate}")]
        public IHttpActionResult DeleteCoeff(int doctorId, string startDate)
        {
            return Ok(_salaryService.DeleteCoeff(doctorId, Convert.ToDateTime(startDate)));
        }

        [HttpPost]
        [Route("api/Salary/Coefficient/add")]
        public IHttpActionResult AddNewCoeff(Models.SalaryCoeffBindingModel model)
        {
            return Ok(_salaryService.AddCoeff(model.DoctorId, model.Coeff, model.StartDate));
        }

        [HttpPost]
        [Route("api/Salary/Coefficient/edit")]
        public IHttpActionResult EditNewCoeff(Models.SalaryCoeffBindingModel model)
        {
            return Ok(_salaryService.EditCoeff(model.DoctorId, model.Coeff, model.StartDate));
        }
    }
}