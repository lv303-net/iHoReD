using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class MedicalCardService : IMedicalCardService
    {
        private readonly IDbContext _dbContext;

        public MedicalCardService(IDbContext dbContext)
        {
             _dbContext = dbContext;
        }

        public List<string[]> GetUserCardByIdAsync(int id)
        {
            string cmd = "GET_MEDICAL_CARD_BY_USER_ID";
            var param = new Dictionary<string,object>()
            {
                {"ID", id }
            };
            List<string[]> result = new List<string[]>();

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                var values = data.Split('*');
                int dataIndex = 0;
                string[] oneRecord = new string[] { };
                foreach (var value in values)
                {
                    if (dataIndex < 8)
                    {
                        oneRecord[dataIndex] = value;
                        dataIndex++;
                    }
                    else
                    {
                        result.Add(oneRecord);
                        dataIndex = 0;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return result;
        }
    }
}
