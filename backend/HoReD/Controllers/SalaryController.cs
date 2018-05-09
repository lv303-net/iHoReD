﻿using System;
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

        [HttpPost]
        [Route("api/Salary/Rate/delete")]
        public IHttpActionResult DeleteRate(Models.SalaryBindingModel model)
        {
            // return Ok();
            return Ok(_salaryService.DeleteRate(model.professionId, model.startDate));
        }

        [HttpPost]
        [Route("api/Salary/Rate/add")]
        public IHttpActionResult AddNewRate(Models.SalaryBindingModel model)
        {            
            return Ok(_salaryService.AddRate(model.professionId, model.rate, model.startDate));
        }

        [HttpPost]
        [Route("api/Salary/Rate/edit")]
        public IHttpActionResult EditNewRate(Models.SalaryBindingModel model)
        {
            return Ok(_salaryService.EditRate(model.professionId, model.rate, model.startDate));
        }
    }
}