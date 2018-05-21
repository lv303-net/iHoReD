using System;
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
        /// Returns active allergies, that current user has
        /// </summary>
        /// <param name="id">ID of needed user</param>
        /// <returns>List of user's allergies names, id and visit</returns>
        [HttpGet]
        [Route("api/PatientData/ActiveAllergies/{id}")]
        public IHttpActionResult GetPatientActiveAllergies(int id)
        {
            try
            {
                var result = _patientData.GetPatientActiveAllergies(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Returns active allergies, that current user don't has
        /// </summary>
        /// <param name="id">ID of needed user</param>
        /// <returns>List of user's allergies names, id</returns>
        [HttpGet]
        [Route("api/PatientData/NonActiveAllergies/{id}")]
        public IHttpActionResult GetPatientNoNActiveAllergies(int id)
        {
            try
            {
                var result = _patientData.GetPatientNonActiveAllergies(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Returns active diseases, that current user has
        /// </summary>
        /// <param name="id">ID of needed user</param>
        /// <returns>List of user's diseases names, id</returns>
        [HttpGet]
        [Route("api/PatientData/ActiveDiseases/{id}")]
        public IHttpActionResult GetPatientActiveDiseases(int id)
        {
            try
            {
                var result = _patientData.GetPatientActiveDiseases(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Returns diseases categories
        /// </summary>
        /// <returns>List of  diseases categories id, name</returns>
        [HttpGet]
        [Route("api/PatientData/Categories")]
        public IHttpActionResult GetCategories()
        {
            try
            {
                var result = _patientData.GetCategories();
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Returns diseases subcategories, that current category has
        /// </summary>
        /// <param name="id">ID of needed category</param>
        /// <returns>List of  diseases subcategories, id, firstcode, lastcode, name</returns>
        [HttpGet]
        [Route("api/PatientData/SubCategories/{id}")]
        public IHttpActionResult GetSubCategories(int id )
        {
            try
            {
                var result = _patientData.GetSubCategories(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Returns diseases diseases, that current subcategory has
        /// </summary>
        /// <param name="id">ID of needed subcategory</param>
        /// <returns>List of  diseases id, code, name</returns>
        [HttpGet]
        [Route("api/PatientData/Diseases/{id}")]
        public IHttpActionResult GetDiseases(int id)
        {
            try
            {
                var result = _patientData.GetDiseases(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Returns all subdiseases, that current user don't has
        /// </summary>
        /// <param name="idPatient">ID of needed user</param>
        /// <param name="idDisease">ID of needed subdisease</param>
        /// <returns>List of user's nonactive subdiseases</returns>
        [HttpGet]
        [Route("api/PatientData/SubDiseases/{idPatient}/{idDisease}")]
        public IHttpActionResult GetPatientDiseases(int idPatient, int idDisease)
        {
            try
            {
                var result = _patientData.GetPatientSubDiseases(idPatient, idDisease);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        /// <summary>
        /// Adds allergies for patient
        /// </summary>
        /// <param name="model">Id patient, starttime of visit and idallergy</param>
        /// <returns>Integer: 1 - if allergy added </returns>
        [HttpPost]
        [Route("api/PatientData/AddAllergy")]
        public IHttpActionResult AddPatientAllergy(Models.MedicalRecordBindingModel model)
        {
            try
            {
                var result = _patientData.AddPatientAllergy(model.IdPatient, Convert.ToDateTime(model.StartTime), model.Allergy);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Adds disease for patient
        /// </summary>
        /// <param name="model">Id patient, starttime of visit and iddisease</param>
        /// <returns>Integer: 1 - if disease added </returns>
        [HttpPost]
        [Route("api/PatientData/AddDisease")]
        public IHttpActionResult AddPatientDisease(Models.MedicalRecordBindingModel model)
        {
            try
            {
                var result = _patientData.AddPatientDisease(model.IdPatient, Convert.ToDateTime(model.StartTime), model.Disease);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Closes disease for patient
        /// </summary>
        /// <param name="model">Id patient, starttime of visit and iddisease</param>
        /// <returns>Integer: 1 - if disease closed </returns>
        [HttpPost]
        [Route("api/PatientData/CloseDisease")]
        public IHttpActionResult ClosePatientDisease(Models.MedicalRecordBindingModel model)
        {
            try
            {
                var result = _patientData.ClosePatientDisease(model.IdPatient, model.Disease, Convert.ToDateTime(model.StartTime));
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Closes allergy for patient
        /// </summary>
        /// <param name="model">Id patient, starttime of visit and iddallergy</param>
        /// <returns>Integer: 1 - if allergy closed </returns>
        [HttpPost]
        [Route("api/PatientData/CloseAllergy")]
        public IHttpActionResult ClosePatientAllergy(Models.MedicalRecordBindingModel model)
        {
            try
            {
                var result = _patientData.ClosePatientAllergy(model.IdPatient, model.Allergy, Convert.ToDateTime(model.EndTime));
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Adds description and treatment for visit
        /// </summary>
        /// <param name="model">Id patient, starttime of visit, description and treatment</param>
        /// <returns>Integer: 1 - if record added </returns>
        [HttpPost]
        [Route("api/PatientData/AddMedicalRecord")]
        public IHttpActionResult AddMedicalRecord(Models.MedicalRecordBindingModel model)
        {
            try
            {
                var result = _patientData.AddMedicalRecord(model.IdPatient, Convert.ToDateTime(model.StartTime), model.Description, model.Treatment);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        /// <summary>
        /// Get description, treatment, doctor and date for diagnose
        /// </summary>
        /// <param name="idPatient">ID of needed user</param>
        /// <param name="idDisease">ID of needed subdisease</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/PatientData/GetDiagnoseInfo/{idPatient}/{idDisease}")]
        public IHttpActionResult GetDiagnoseInfo(int idPatient, int idDisease)
        {
            try
            {
                var result = _patientData.GetDiagnoseInfo(idPatient, idDisease);
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