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
            var listPast = Utils.ParseSqlQuery.GetPastRates(str); 
            
            const string cmd1 = "GET_RATE_FOR_PROFESSION_FUTURE";
            str = _dbContext.ExecuteSqlQuery(cmd1, '*', param);
            var listFuture = Utils.ParseSqlQuery.GetFutureRates(str);

            var list = listPast.Concat(listFuture).ToList();

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

        public List<SalaryCoeff> GetCoefficientsForDoctor(int doctorId)
        {
            const string cmd = "GET_COEFF_FOR_DOCTOR_PAST";
            var param = new Dictionary<string, object>()
            {
                {"@DOCTOR_ID", doctorId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var listPast = Utils.ParseSqlQuery.GetPastCoeff(str);

            const string cmd1 = "GET_COEFF_FOR_DOCTOR_FUTURE";
            str = _dbContext.ExecuteSqlQuery(cmd1, '*', param);
            var listFuture = Utils.ParseSqlQuery.GetFutureCoeff(str);

            var list = listPast.Concat(listFuture).ToList();

            return list;
        }

        public int DeleteCoeff(int doctorId, DateTime startDate)
        {
            const string cmd = "DELETE_SOME_COEFF";

            var param = new Dictionary<string, object>()
            {
                {"@DOCTOR_ID", doctorId},
                {"@START_DATE", startDate},
            };

            return _dbContext.ExecuteQuery(cmd, param);
        }

        public int AddCoeff(int doctorId, double coeff, DateTime startDate)
        {
            const string cmd = "ADD_NEW_COEFF";

            var param = new Dictionary<string, object>()
            {
                {"@DOCTOR_ID", doctorId},
                {"@COEFFICIENT", coeff },
                {"@START_DATE", startDate},
            };

            return _dbContext.ExecuteQuery(cmd, param);
        }

        public int EditCoeff(int doctorId, double coeff, DateTime startDate)
        {
            const string cmd = "EDIT_SOME_COEFF";

            var param = new Dictionary<string, object>()
            {
                {"@DOCTOR_ID", doctorId},
                {"@COEFFICIENT", coeff },
                {"@START_DATE", startDate},
            };

            return _dbContext.ExecuteQuery(cmd, param);
        }
    }
}
