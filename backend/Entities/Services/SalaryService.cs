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
            const string cmd = "GET_RATE_FOR_PROFESSION_PAST";
            var param = new Dictionary<string, object>()
            {
                {"@PROFFESION_ID", professionId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<SalaryRate>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryRate salary = new SalaryRate()
                {
                    Rate = Convert.ToDouble(values.GetValue(i)),
                    StartDate = Convert.ToDateTime(values.GetValue(i+1)),                 
                    State = -1
                };

                list.Add(salary);
            }
            const string cmd1 = "GET_RATE_FOR_PROFESSION_FUTURE";
            str = _dbContext.ExecuteSqlQuery(cmd1, '*', param);
            values = str.Split('*');
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryRate salary;
                if (i == 0)
                {
                    salary = new SalaryRate()
                    {
                        Rate = Convert.ToDouble(values.GetValue(i)),
                        StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                        State = 0
                    };
                }
                else
                {
                    salary = new SalaryRate()
                    {
                        Rate = Convert.ToDouble(values.GetValue(i)),
                        StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                        State = 1
                    };
                }

                list.Add(salary);
            }
            return list;
        }

        public int DeleteRate(int professionId, DateTime startDate)
        {
            const string cmd = "DELETE_SOME_RATE";

            var param = new Dictionary<string, object>()
            {
                {"@PROFFESION_ID", professionId},
                {"@START_DATE", startDate},
            };

            return _dbContext.ExecuteQuery(cmd, param);
        }

        public int AddRate(int professionId, double rate, DateTime startDate)
        {
            const string cmd = "ADD_NEW_RATE";

            var param = new Dictionary<string, object>()
            {
                {"@PROFFESION_ID", professionId},
                {"@RATE", rate },
                {"@START_DATE", startDate},
            };

            return _dbContext.ExecuteQuery(cmd, param);
        }

        public int EditRate(int professionId, double rate, DateTime startDate)
        {
            const string cmd = "EDIT_SOME_RATE";

            var param = new Dictionary<string, object>()
            {
                {"@PROFFESION_ID", professionId},
                {"@RATE", rate },
                {"@START_DATE", startDate},
            };

            return _dbContext.ExecuteQuery(cmd, param);
        }
    }
}
