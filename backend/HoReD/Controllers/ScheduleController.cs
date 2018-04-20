using System;
using System.Collections.Generic;
using System.Web.Http;
using Entities;
using Entities.Services;

namespace HoReD.Controllers
{
    /// <summary>
    /// Controller that represents information about Doctors
    /// </summary>

    public class ScheduleController : ApiController
    {
        private readonly IScheduleService _visitService;

        public ScheduleController(IScheduleService visitService)
        {
            _visitService = visitService;
        }

        /// <summary>
        /// Inserts new schedule record into database
        /// </summary>
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult InsertNewScheduleRecord(Models.ScheduleBindingModel model)
        {
            try
            {
                _visitService.InsertScheduleRecord(model.IdDoctor, model.IdPatient, model.startDateTime, model.endDateTime);
                return Ok();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}