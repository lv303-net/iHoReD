using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class SalaryService : ISalaryService
    {
        private readonly IDbContext _dbContext;

        public SalaryService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<SalaryRate> GetRatesForProfession(int professionId)
        {
            const string cmd = "GET_RATE_FOR_PROFESSION";
            var param = new Dictionary<string, object>()
            {
                {"@ID", professionId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<SalaryRate>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryRate salary = new SalaryRate()
                {
                    rate = Convert.ToDouble(values.GetValue(i)),
                    startDate = Convert.ToDateTime(values.GetValue(i+1))                    
                };

                list.Add(salary);
            }
            return list;
        }

        public string DeleteRate(int professionId, DateTime startDate)
        {
            const string cmd = "DELETE_SOME_RATE";

            var param = new Dictionary<string, object>()
            {
                {"@ID", professionId},
                {"@START_DATE", startDate},
            };

            _dbContext.ExecuteSqlQuery(cmd, param);
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var returnedStatus = values.GetValue(0).ToString();
            return returnedStatus;
        }

        public void AddRate(int professionId, double rate, DateTime startDate)
        {
            const string cmd = "ADD_NEW_RATE";

            var param = new Dictionary<string, object>()
            {
                {"@ID", professionId},
                {"@RATE", rate },
                {"@START_DATE", startDate},
            };

            _dbContext.ExecuteSqlQuery(cmd, param);
        }

        public string EditRate(int professionId, double rate, DateTime startDate)
        {
            const string cmd = "EDIT_SOME_RATE";

            var param = new Dictionary<string, object>()
            {
                {"@ID", professionId},
                {"@RATE", rate },
                {"@START_DATE", startDate},
            };

            _dbContext.ExecuteSqlQuery(cmd, param);
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var returnedStatus = values.GetValue(0).ToString();
            return returnedStatus;
        }
    }
}
