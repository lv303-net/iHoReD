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
    [RoutePrefix("MedicalCard")]
    public class MedicalCardController : ApiController
    {
        private readonly IMedicalCardService _medicalCard;

        public MedicalCardController(IMedicalCardService medicalCard)
        {
            _medicalCard = medicalCard;
        }

        /// <summary>
        /// Method that get user id and return his medical card
        /// </summary>
        /// 
        [HttpGet]
        [Route("GetByUserId/{userId}/{pageNumber}/{elementOnPageCount}/{columnNumber}")]
        public IHttpActionResult GetMedicalCardByPatientId(int userId, int pageNumber, int elementOnPageCount, int columnNumber)
        {
            try
            {
                var result = _medicalCard.GetUserCardById(userId, pageNumber, elementOnPageCount, columnNumber);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpGet]
        [Route("GetPageCount/{userId}/{elementOnPageCount}")]
        public IHttpActionResult GetPageCount(int userId, int elementOnPageCount)
        {
            try
            {
                return Ok(_medicalCard.GetPageCountForUserMC(userId, elementOnPageCount));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}