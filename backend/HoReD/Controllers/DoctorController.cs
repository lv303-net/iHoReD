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

        [HttpGet]
        [Route("GetDoctors/{professionId}")]
         public IHttpActionResult GetDoctorsByProfession(int professionId)
        {
             return Ok(_doctorService.GetDoctorsByProfessionId(professionId));
        }

        [HttpGet]
        [ActionName("GetProfessions")]
        [Route("ProfessionsStatic/{isStatic=true}")]
        [Route("ProfessionsNotStatic/{isStatic=false}")]
        public IHttpActionResult GetProfessions(bool isStatic)
        {
            return Ok(_doctorService.GetProfessions(isStatic));
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
            var generalEvents = _doctorService.GetGeneralEventsList(doctorId, dateStart, dateFinish);

            List<EventBindingModel> result = new List<EventBindingModel>();
            foreach (var general in generalEvents)
            {
                EventBindingModel eventModel = new EventBindingModel()
                {
                    dateTime = general.dateTime,
                    isFake = general.isFake
                };
                result.Add(eventModel);
            }

            return Ok(result);
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
    }
}
