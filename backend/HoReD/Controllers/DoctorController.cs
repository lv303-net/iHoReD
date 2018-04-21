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
    //[RoutePrefix("api/Doctor")]
    public class DoctorController : ApiController
    {
        private readonly IDoctorService _doctorService;
        
        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        /// <summary>
        /// Gets full infiormation about Doctors in database
        /// </summary>
        /// <returns>List of instances of the class DoctorInfo</returns>
        /// <example>http://localhost:*****/api/Doctor/</example>
        [HttpGet]
        public List<DoctorInfo> GetDoctors()
        {
            return _doctorService.GetDoctors();
        }

        [HttpGet]
        [Route("GetDoctors/{professionId}")]
         public List<string[]> GetDoctorsByProfession(int professionId)
        {
             return _doctorService.GetDoctorsByProfessionId(professionId);
        }

        [HttpGet]
        [ActionName("GetProfessions")]
        [Route("ProfessionsStatic/{isStatic=true}")]
        [Route("ProfessionsNotStatic/{isStatic=false}")]
        public List<string[]> GetProfessions(bool isStatic)
        {
            return _doctorService.GetProfessions(isStatic);
        }

        [HttpGet]
        [Route("DoctorEvents/{doctorId}/{dateStart=}/{dateFinish=}")]
        public List<string[]> GetDoctorEvents(int doctorId, DateTime dateStart, DateTime dateFinish)
        {
            var rules = _doctorService.GetDoctorAllRules(doctorId, dateStart, dateFinish);
            return _doctorService.ConvertToEvents(rules);
        }

    }
}
