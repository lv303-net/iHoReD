using System;
using System.Collections.Generic;
using System.Web.Http;
using Entities;
using Entities.Services;
using HoReD.AuthFilters;

namespace HoReD.Controllers
{
    /// <summary>
    /// Controller manages salary management
    /// </summary>

    public class SalaryController : ApiController
    {
        private readonly ISalaryService _salaryService;

        /// <summary>
        /// Constructor for SalaryController
        /// </summary>
        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        /// <summary>
        /// Gets all rates for some profession by its id
        /// </summary>
        /// <param name="professionId">Profession id</param>
        /// <returns>List of instances of the class SalaryRate (Rate, StartDate, State)</returns>
        /// <example>http://localhost:*****/api/Salary/Rate/get/{professionId}</example>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Rate/get/{professionId}")]
        public IHttpActionResult GetRatesForProfession(int professionId)
        {
            return Ok(_salaryService.GetRatesForProfession(professionId));
        }


        /// <summary>
        /// Delete some rate by assigned professionId and startDate
        /// </summary>
        /// <param name="professionId">Profession id</param>
        /// <param name="startDate">The start date of rate</param>
        /// <returns>Status code: 0 - something went wrong, 1 - successful</returns>
        /// <example>http://localhost:*****/api/Salary/Rate/delete/{professionId}/{startDate}</example>
        [HttpDelete]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Rate/delete/{professionId}/{startDate}/{userId}")]
        public IHttpActionResult DeleteRate(int professionId, string startDate, int userId)
        {
            return Ok(_salaryService.DeleteRate(professionId, Convert.ToDateTime(startDate), userId));
        }

        /// <summary>
        /// Add some rate defined by the end-user by assigned professionId and startDate
        /// </summary>
        /// <param name="model">Binding model that contains professionId, rate and startDate</param>
        /// <returns>Status code: 0 - something went wrong, 1 - successful</returns>
        /// <example>http://localhost:*****/api/Salary/Rate/add</example>
        [HttpPost]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Rate/add")]
        public IHttpActionResult AddNewRate(Models.SalaryRateBindingModel model)
        {            
            return Ok(_salaryService.AddRate(model.ProfessionId, model.Rate, model.StartDate, model.UserId));
        }

        /// <summary>
        /// Edit some rate defined by the end-user by assigned professionId and startDate
        /// </summary>
        /// <param name="model">Binding model that contains professionId, rate and startDate</param>
        /// <returns>Status code: 0 - something went wrong, 1 - successful</returns>
        /// <example>http://localhost:*****/api/Salary/Rate/edit</example>
        [HttpPost]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Rate/edit")]
        public IHttpActionResult EditNewRate(Models.SalaryRateBindingModel model)
        {
            return Ok(_salaryService.EditRate(model.ProfessionId, model.Rate, model.StartDate, model.UserId));
        }

        /// <summary>
        /// Gets all coefficients for some doctor by its id
        /// </summary>
        /// <param name="doctorId">Doctor id</param>
        /// <returns>List of instances of the class SalaryRate (Rate, StartDate, State)</returns>
        /// <example>http://localhost:*****/api/Salary/Rate/get/{doctorId}</example>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Coefficient/get/{doctorId}")]
        public IHttpActionResult GetCoefficientsForDoctor(int doctorId)
        {
            return Ok(_salaryService.GetCoefficientsForDoctor(doctorId));
        }

        /// <summary>
        /// Delete some rate by assigned doctorId and startDate
        /// </summary>
        /// <param name="doctorId">Doctor id</param>
        /// <param name="startDate">The start date of rate</param>
        /// <returns>Status code: 0 - something went wrong, 1 - successful</returns>
        /// <example>http://localhost:*****/api/Salary/Rate/delet/{doctorId}/{startDate}</example>
        [HttpDelete]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Coefficient/delete/{doctorId}/{startDate}")]
        public IHttpActionResult DeleteCoeff(int doctorId, string startDate )
        {
            return Ok(_salaryService.DeleteCoeff(doctorId, Convert.ToDateTime(startDate)));
        }

        /// <summary>
        /// Add some coeff defined by the end-user by assigned doctorId and startDate
        /// </summary>
        /// <param name="model">Binding model that contains doctorId, coeff and startDate</param>
        /// <returns>Status code: 0 - something went wrong, 1 - successful</returns>
        /// <example>http://localhost:*****/api/Salary/Coefficient/add</example>
        [HttpPost]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Coefficient/add")]
        public IHttpActionResult AddNewCoeff(Models.SalaryCoeffBindingModel model)
        {
            return Ok(_salaryService.AddCoeff(model.DoctorId, model.Coeff, model.StartDate));
        }

        /// <summary>
        /// Edit some coeff defined by the end-user by assigned doctorId and startDate
        /// </summary>
        /// <param name="model">Binding model that contains doctorId, rate and startDate</param>
        /// <returns>Status code: 0 - something went wrong, 1 - successful</returns>
        /// <example>http://localhost:*****/api/Salary/Coefficient/edit</example>
        [HttpPost]
        [TokenAuthenticate(Role = "admin")]
        [Route("api/Salary/Coefficient/edit")]
        public IHttpActionResult EditNewCoeff(Models.SalaryCoeffBindingModel model)
        {
            return Ok(_salaryService.EditCoeff(model.DoctorId, model.Coeff, model.StartDate));
        }
    }
}