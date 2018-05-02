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
                {"ID_USER", id }
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
    }
}
