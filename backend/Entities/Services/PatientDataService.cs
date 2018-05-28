using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class PatientDataService : IPatientDataService
    {
        private readonly IDbContext _dbContext;

        public PatientDataService(IDbContext dbContext)
        {
             _dbContext = dbContext;
        }

        public List<PatientData> GetPatientDataById(int id)
        {
            string cmd = "GET_PATIENT_INFO";
            var param = new Dictionary<string,object>()
            {
                {"@ID_USER", id }
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetPatientData(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<Allergy> GetPatientActiveAllergies(int id)
        {
            string cmd = "ACTIVE_ALLERGY";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", id }
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetPatientActiveAllergies(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<Allergy> GetPatientNonActiveAllergies(int id)
        {
            string cmd = "NON_ACTIVE_ALLERGY";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", id }
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetPatientNonActiveAllergies(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<IllnessCategory> GetCategories()
        {
            string cmd = "RETURN_CATEGORIES";
            var param = new Dictionary<string, object>();

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetCategories(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<IllnessSubCategory> GetSubCategories(int idCategory)
        {
            string cmd = "RETURN_SUBCATEGORIES";
            var param = new Dictionary<string, object>()
            {
                {"@CATEGORY", idCategory }
            };
            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetSubCategories(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<IllnessDiseases> GetDiseases(int idSubCategory)
        {
            string cmd = "RETURN_DISEASES";
            var param = new Dictionary<string, object>()
            {
                {"@SUBCATEGORY", idSubCategory }
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetDiseases(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<IllnessSubDiseases> GetPatientSubDiseases(int idPatient, int idDisease)
        {
            string cmd = "NON_ACTIVE_DISEASES_FOR_CATEGORY";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient },
                {"@DISEASEID",  idDisease}
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetPatientSubDiseases(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<PatientDiseases> GetPatientActiveDiseases(int idPatient)
        {
            string cmd = "ACTIVE_DISEASES";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient }
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetPatientActiveDiseases(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public int AddPatientAllergy(int idPatient, DateTime startTime, int allergy)
        {
            string cmd = "ADD_ALLERGY";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient },
                {"@DATE_VISIT",  startTime},
                {"@ID_ALLERGY", allergy }
            };

            try
            {
                return _dbContext.ExecuteQuery(cmd, param);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public int AddPatientDisease(int idPatient, DateTime startTime, int disease)
        {
            string cmd = "ADD_DISEASE";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient },
                {"@DATE_VISIT",  startTime},
                {"@ID_DISEASE", disease }
            };

            try
            {
                return _dbContext.ExecuteQuery(cmd, param);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public int ClosePatientAllergy(int idPatient, int allergy, DateTime startTime)
        {
            string cmd = "CLOSE_ALLERGY";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient },
                {"@ID_ALLERGY", allergy },
                {"@START_VISIT_TIME",  startTime}
            };

            try
            {
                return _dbContext.ExecuteQuery(cmd, param);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public int ClosePatientDisease(int idPatient, int disease, DateTime startTime)
        {
            string cmd = "CLOSE_DISEASE";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient },
                {"@ID_DISEASE", disease },
                {"@START_VISIT_TIME",  startTime}
            };

            try
            {
                return _dbContext.ExecuteQuery(cmd, param);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public int AddMedicalRecord(int idPatient, DateTime startTime, string description, string treatment)
        {
            string cmd = "ADD_DESCRIPTION";
            var param = new Dictionary<string, object>()
            {
                {"@ID_USER", idPatient },
                {"@DESCRIPTION",  description},
                {"@CURE", treatment },
                {"@DATE_VISIT",  startTime},
            };

            try
            {
                return _dbContext.ExecuteQuery(cmd, param);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public VisitInfo GetActiveAllergyInfo(int idPatient, int idAllergy)
        {
            string cmd = "GET_USER_ALLERGY_INFO";
            var param = new Dictionary<string, object>()
            {
                {"@PATIENT_ID",  idPatient},
                {"@ALLERGY_ID", idAllergy}
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetActiveAllergyInfo(data);
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public DiseaseInfo GetDiagnoseInfo(int idPatient, int idDisease)
        {
            string cmd = "GET_DISEASE_INFO";
            var param = new Dictionary<string, object>()
            {
                {"@ID_DISEASE", idDisease },
                {"@IDPATIENT",  idPatient}
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetDiagnoseInfo(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }

        public List<DiseaseInfo> GetClosedDiseaseInfo(int idPatient)
        {
            string cmd = "GET_INFO_ABOUT_CLOSE_DISEASE";
            var param = new Dictionary<string, object>()
            {
                {"@PATIENT_ID",  idPatient}
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                return Utils.ParseSqlQuery.GetClosedDiseaseInfo(data);
            }

            catch (Exception e)
            {
                throw;
            }
        }
    }
}
