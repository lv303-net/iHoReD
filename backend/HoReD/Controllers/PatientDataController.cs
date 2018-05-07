﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Entities.Services;

namespace HoReD.Controllers
{
    /// <summary>
    /// Controller that represents information about patient medical card
    /// </summary>
    public class PatientDataController : ApiController
    {
        private readonly IPatientDataService _patientData;

        public PatientDataController(IPatientDataService patientData)
        {
            _patientData = patientData;
        }

        /// <summary>
        /// Method that get user id and return his medical card
        /// </summary>
        /// <param name="id">ID of needed user</param>
        /// <returns>Patient Data</returns>
        [HttpGet]
        public IHttpActionResult GetPatientDataByPatientId(int id)
        {
            try
            {
                var result = _patientData.GetPatientDataById(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        /// <summary>
        /// Returns all allergies, that current user has
        /// </summary>
        /// <param name="id">ID of needed user</param>
        /// <returns>List of user's allergies names</returns>
        [HttpGet]
        [Route("api/PatientData/Allergies/{id}")]
        public IHttpActionResult GetPatientAllergies(int id)
        {
            try
            {
                var result = _patientData.GetPatientAllergies(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}