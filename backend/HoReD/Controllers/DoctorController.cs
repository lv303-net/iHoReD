using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;
using Entities;
using Entities.Services;
using HoReD.Models;

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
        /// Gets full information about Doctors in database
        /// </summary>
        /// <returns>List of instances of the class DoctorInfo</returns>
        /// <example>http://localhost:*****/api/Doctor/</example>
        [HttpGet]
        public IHttpActionResult GetDoctors()
        {
            return Ok(_doctorService.GetDoctors());
        }

        /// <summary>
        /// Returns all doctors' ID, name and surname with current profession ID
        /// </summary>
        /// <param name="professionId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDoctors/{professionId}")]
         public IHttpActionResult GetDoctorsByProfession(int professionId)
        {
             return Ok(_doctorService.GetDoctorsByProfessionId(professionId));
        }

        /// <summary>
        /// Returns list of all static/nonstatic professions' id & name
        /// </summary>
        /// <param name="isStatic"></param>
        /// <returns></returns>
        [HttpGet]
        [ActionName("GetProfessions")]
        [Route("ProfessionsStatic/{isStatic=true}")]
        [Route("ProfessionsNotStatic/{isStatic=false}")]
        public IHttpActionResult GetProfessions(bool isStatic)
        {
            return Ok(_doctorService.GetProfessions(isStatic));
        }

        /// <summary>
        /// Returns list of all static/nonstatic professions' id & name
        /// </summary>
        /// <param name="isStatic"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AllProfessions")]
        public IHttpActionResult GetAllProfessions()
        {
            return Ok(_doctorService.GetAllProfessions());
        }

        /// <summary>
        /// Gets information about Doctor events
        /// </summary>
        /// <returns>List of instances of the class Event</returns>
        /// <example>http://localhost:*****/DoctorEvents/{doctorId}/{dateStart}/{dateFinish}</example>
        [HttpGet]
        [Route("DoctorEvents/{doctorId}/{dateStart}/{dateFinish}")]
        public IHttpActionResult GetDoctorEvents(int doctorId, DateTime dateStart, DateTime dateFinish)
        {
            List<Event> generalEvents = _doctorService.GetGeneralEventsList(doctorId, dateStart, dateFinish);
            return Ok(generalEvents);
        }
        /// <summary>
        /// Similar to GetDoctorEvents, but also returns id and name of user, that has session in relevant event
        /// </summary>
        /// <param name="doctorId"></param>
        /// <param name="dateStart"></param>
        /// <param name="dateFinish"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("DoctorEventsForDoctor/{doctorId}/{dateStart}/{dateFinish}")]
        public IHttpActionResult GetDoctorEventsForDoctor(int doctorId, DateTime dateStart, DateTime dateFinish)
        {
            var toParse = _doctorService.GetGeneralEventsListForDoctor(doctorId, dateStart, dateFinish);
            List<BookedEventBindingModel> toRet = new List<BookedEventBindingModel>();
            
            foreach (var g in toParse)
            {
                BookedEventBindingModel eventModel = new BookedEventBindingModel()
                {
                    dateTime = g.Item1.dateTime,
                    isFake = g.Item1.isFake,
                    PatientId = g.Item2.Id,
                    PatientName = (g.Item2.Id == 0) ? null : g.Item2.FirstName+" "+g.Item2.LastName
                };
                toRet.Add(eventModel);
            }
            return Ok(toRet);
        }

        /// <summary>
        /// Get doctor's salary statistics in specific range of time
        /// </summary>
        /// <param name="doctorId"></param>
        /// <param name="dateStart"></param>
        /// <param name="dateFinish"></param>
        /// <returns>List of instances of the class SalaryStatistics</returns>
        /// <example>http://localhost:*****/DoctorSalaryStatistics/{doctorId}/{dateStart}/{dateFinish}</example>
        [HttpGet]
        [Route("DoctorSalaryStatistics/{doctorId}/{dateStart}/{dateFinish}")]
        public IHttpActionResult GetDoctorSalaryStatistics(int doctorId, DateTime dateStart, DateTime dateFinish)
        {
            //List<SalaryStatistics> statistics = _doctorService.GetDoctorSalaryStatistics(doctorId, dateStart, dateFinish);
            List<SalaryStatistics>[] statistics = _doctorService.GetDoctorSalaryStatisticsSplitedByMonths(doctorId, dateStart, dateFinish);
            return Ok(statistics);
        }
    }
}
