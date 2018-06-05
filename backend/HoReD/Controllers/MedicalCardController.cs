using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Entities.Services;
using HoReD.AuthFilters;

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
        /// <param name="userId">ID of needed user</param>
        /// <param name="pageNumber">Index of page</param>
        /// <param name="elementOnPageCount"> Total amount of records on one page</param>
        /// <param name="columnNumber"> Amount of column on page</param>
        /// <returns>Array of records</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "patient,doctor")]
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

        /// <summary>
        /// Returns Total amount of needed pages with {elementOnPageCount} to display all medical card data
        /// </summary>
        /// <param name="userId">ID of needed user</param>
        /// <param name="elementOnPageCount">Amount of records displayed on one page</param>
        /// <returns>Total page amount</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "patient,doctor")]
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

        [HttpPost]
        [TokenAuthenticate(Role = "patient,doctor")]
        [Route("CheckIfExists")]
        public IHttpActionResult CheckIfExist(Models.MedicalRecordBindingModel model)
        {
            return Ok(_medicalCard.CheckIfDescriptionExists(model.IdPatient, model.StartTime));
        }
    }
}