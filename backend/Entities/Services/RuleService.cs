using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class RuleService : IRuleService
    {
        private readonly IDbContext _dbContext;

        public RuleService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<DoctorRules> GetRules()
        {
            const string cmd = "GET_RULES";

            var param = new Dictionary<string, object>();
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);

            return Utils.ParseSqlQuery.GetRules(str);
        }

        public void AddOrUpdateRule(DoctorRules rule)
        {
            string cmd = String.Empty;

            var param = new Dictionary<string, object>()
            {
                {"@NAME", rule.RuleName},
                {"@HOUR_START", rule.HourStart},
                {"@HOUR_END", rule.HourFinish},
                {"@PERIOD_START", rule.PeriodStart},
                {"@PERIOD_END", rule.PeriodFinish},
                {"@INCLUSIVE", rule.IfInclusive},
                {"@SUNDAY", rule.Week[DayOfWeek.Sunday]},
                {"@MONDAY", rule.Week[DayOfWeek.Monday]},
                {"@TUESDAY", rule.Week[DayOfWeek.Tuesday]},
                {"@WEDNESDAY", rule.Week[DayOfWeek.Wednesday]},
                {"@THIRSDAY", rule.Week[DayOfWeek.Thursday]},
                {"@FRIDAY", rule.Week[DayOfWeek.Friday]},
                {"@SATURDAY", rule.Week[DayOfWeek.Saturday]},
            };

            if (rule.IdRule < 0)
            {
                cmd = "ADD_RULE";
            }
            else
            {
                cmd = "UPDATE_RULE";
                param.Add("@ID", rule.IdRule);
            }

            _dbContext.ExecuteSqlQuery(cmd, param);

        }

        public void DeleteRule(int  IdRule)
        {
            const string cmd = "DELETE_RULE";

            var param = new Dictionary<string, object>()
            {
                {"@ID", IdRule},
            };

            _dbContext.ExecuteSqlQuery(cmd, param);

        }

        public List<DoctorInfo> GetDoctorsByIdRule(int IdRule, bool hasRule)
        {
            string cmd = hasRule ? "GET_DOCTORS_WITH_RULE" : "GET_DOCTORS_WITHOUT_RULE";

            var param = new Dictionary<string, object>()
            {
                {"@ID", IdRule}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);

            return Utils.ParseSqlQuery.GetDoctorsByIdRule(str);
        }

        public void DismissDoctorFromRule(int IdRule, int IdDoctor)
        {
            const string cmd = "DISMISS_DOCTOR_FROM_RULE";

            var param = new Dictionary<string, object>()
            {
                {"@RULE_ID", IdRule},
                {"@DOCTOR_ID", IdDoctor},
            };

            _dbContext.ExecuteSqlQuery(cmd, param);

        }

        public void AssignDoctorToRule(int IdRule, int IdDoctor)
        {
            const string cmd = "ASSIGN_DOCTOR_TO_RULE";

            var param = new Dictionary<string, object>()
            {
                {"@RULE_ID", IdRule},
                {"@DOCTOR_ID", IdDoctor},
            };

            _dbContext.ExecuteSqlQuery(cmd, param);
        }
    }
}
