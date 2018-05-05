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

        public List<MedicalCard> GetUserCardById(int userId, int pageNumber, int elementOnPageCount)
        {
            string cmd = "GET_MEDICAL_CARD_BY_USER_ID";
            var param = new Dictionary<string,object>()
            {
                {"ID_USER", userId },
                {"ELEMENT_COUNT", elementOnPageCount},
                {"PAGE_NUMBER", pageNumber}
            };

            try
            {
                var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                var nonResponsiveList = Utils.ParseSqlQuery.GetMedicalCards(data);
                List<MedicalCard> responsiveList = new List<MedicalCard>();
                for (int i = 0; i < Math.Ceiling((double)elementOnPageCount / 2) ; i++)
                {
                    if (!(i > nonResponsiveList.Count))
                    {
                        responsiveList.Add(nonResponsiveList[i]);
                        if (nonResponsiveList.Count > i + Math.Ceiling((double)nonResponsiveList.Count / 2))
                        {
                            responsiveList.Add(nonResponsiveList[i + (int)Math.Ceiling((double)elementOnPageCount / 2)]);
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
    }
}
