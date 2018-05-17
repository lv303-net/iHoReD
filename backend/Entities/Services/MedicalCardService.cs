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

        public List<MedicalCard> GetUserCardById(int userId, int pageNumber, int elementOnPageCount, int columnNumber)
        {
            string cmd = "GET_MEDICAL_RECORDS_FOR_USER";
            var rowNuber = (int)Math.Ceiling((double) elementOnPageCount / columnNumber);
            var param = new Dictionary<string,object>()
            {
                {"ID_USER", userId },
                {"ELEMENT_COUNT", elementOnPageCount},
                {"PAGE_NUMBER", pageNumber}
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                var nonResponsiveList = Utils.ParseSqlQuery.GetMedicalRecords(data);
                List<MedicalCard> responsiveList = new List<MedicalCard>();
                for (int i = 0; i < columnNumber; i++)
                {
                    for (int j = 0; j < rowNuber; j++)
                    {
                        if (nonResponsiveList.Count > i + j * columnNumber)
                        {
                            responsiveList.Add(nonResponsiveList[i + j * columnNumber]);
                        }
                    }
                }
                return responsiveList;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public int GetPageCountForUserMC(int userId, int elementOnPageCount)
        {
            string cmd = "GET_PAGE_COUNT_FOR_MC_DEPENDING_ELEM_COUNT";
            var param = new Dictionary<string, object>()
            {
                {"USER_ID", userId },
                {"ELEMENT_COUNT", elementOnPageCount}
            };
            try
            {
                return int.Parse(_dbContext.ExecuteSqlQuery(cmd, '*', param));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public int CheckIfDescriptionExists(int patientId, DateTime startDate) {
            string cmd = "CHECK_IF_DESCRIPTION_EXISTS";
            var param = new Dictionary<string, object>()
            {
                {"IDPATIENT", patientId },
                {"START_DATETIME", startDate}
            };
            return _dbContext.ExecuteQuery(cmd, param);
        }
    }
}
