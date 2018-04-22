using System;
using System.Collections.Generic;
using System.Web.Http;
using Entities;
using Entities.Services;

namespace HoReD.Controllers
{
    /// <summary>
    /// Controller that represents information about doctors schedule
    /// </summary>
   
    public class DoctorScheduleController : ApiController
    {
        private readonly IDoctorService _doctorService;
        
        public DoctorScheduleController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        /// <summary>
        /// Gets doctor's schedule  from database
        /// </summary>
        /// <returns>List of instances of the worcing hour of Doctor</returns>
        /// <example>http://localhost:*****/GetDoctorSchedule/{doctorId}</example>
        /// 


        [HttpGet]
        [Route("GetDoctorSchedule/{doctorId}")]
        public List<string[]> GetDoctorSchedule(int doctorId)
        {
            return _doctorService.GetDoctorSchedule(doctorId);
        }

    }
}
