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
                return Utils.ParseSqlQuery.GetMedicalCards(data);
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}
