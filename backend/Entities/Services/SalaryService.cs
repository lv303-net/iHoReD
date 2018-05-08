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

        public List<string[]> GetRatesForProfession(int professionId)
        {
            const string cmd = "GET_RATE_FOR_PROFESSION";
            var param = new Dictionary<string, object>()
            {
                {"@ID", professionId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<string[]>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                string[] name = { values.GetValue(0 + i).ToString(), values.GetValue(1 + i).ToString()};
                list.Add(name);

            }
            return list;
        }
    }
}
