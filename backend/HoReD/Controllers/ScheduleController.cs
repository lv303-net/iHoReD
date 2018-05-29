using System;
using System.Collections.Generic;
using System.Web.Http;
using Entities;
using Entities.Services;
using HoReD.AuthFilters;

namespace HoReD.Controllers
{
    /// <summary>
    /// Controller manages schedules
    /// </summary>

    public class ScheduleController : ApiController
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        /// <summary>
        /// Inserts new schedule record into database
        /// </summary>
        /// <param name="model"> Stores data about schedule(start time, end time and IDs of doctor and patient</param>
        /// <returns>Status code</returns>
        [HttpPost]
        [TokenAuthenticate(Role = "user,doctor,admin")]
        public IHttpActionResult InsertNewScheduleRecord(Models.ScheduleBindingModel model)
        {
            int response;
            try
            {
                response = _scheduleService.InsertScheduleRecord(model.IdDoctor, model.IdPatient, model.startDateTime, model.endDateTime);
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}