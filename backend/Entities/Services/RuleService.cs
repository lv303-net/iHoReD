﻿using System;
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
            var values = str.Split('*');
            var list = new List<DoctorRules>();
            for (int i = 0; i < (values.Length - 1); i += 14)
            {
                var doctorRule = new DoctorRules()
                {
                    IdRule = Convert.ToInt32(values.GetValue(i).ToString()),
                    RuleName = values.GetValue(i + 1).ToString(),
                    HourStart = TimeSpan.Parse(values.GetValue(i + 2).ToString()),
                    HourFinish = TimeSpan.Parse(values.GetValue(i + 3).ToString()),
                    PeriodStart = DateTime.Parse(values.GetValue(i + 4).ToString()),
                    PeriodFinish = DateTime.Parse(values.GetValue(i + 5).ToString()),
                    IfInclusive = Convert.ToBoolean(values.GetValue(i + 6)),
                    Week = new Dictionary<DayOfWeek, bool>()
                    {
                        {DayOfWeek.Sunday, Convert.ToBoolean(values.GetValue(i + 7).ToString().ToLowerInvariant())},
                        {DayOfWeek.Monday,  Convert.ToBoolean(values.GetValue(i + 8).ToString().ToLowerInvariant())},
                        {DayOfWeek.Tuesday,  Convert.ToBoolean(values.GetValue(i + 9).ToString().ToLowerInvariant())},
                        {DayOfWeek.Wednesday,  Convert.ToBoolean(values.GetValue(i + 10).ToString().ToLowerInvariant())},
                        {DayOfWeek.Thursday,  Convert.ToBoolean(values.GetValue(i + 11).ToString().ToLowerInvariant())},
                        {DayOfWeek.Friday,  Convert.ToBoolean(values.GetValue(i + 12).ToString().ToLowerInvariant())},
                        {DayOfWeek.Saturday,  Convert.ToBoolean(values.GetValue(i + 13).ToString().ToLowerInvariant()) }
                    },
                };
                list.Add(doctorRule);

            }
            _dbContext.Dispose();
            return list;
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
                {"@TUESDAY", rule.Week[DayOfWeek.Thursday]},
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

            _dbContext.Insert(cmd, param);

            _dbContext.Dispose();
        }

        public List<DoctorInfo> GetDoctorsByIdRule(int IdRule)
        {
            const string cmd = "GET_DOCTORS_WITH_RULE";

            var param = new Dictionary<string, object>()
            {
                {"@ID", IdRule}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<DoctorInfo>();
            for (int i = 0; i < (values.Length - 1); i += 5)
            {
                var doctor = new DoctorInfo
                {
                    Id = Convert.ToInt32(values.GetValue(1+ i)),
                    FirstName = values.GetValue(2 + i).ToString(),
                    LastName = values.GetValue(3 + i).ToString(),
                    ProfessionName = values.GetValue(4 + i).ToString(),
                };
                list.Add(doctor);

            }
            _dbContext.Dispose();
            return list;
        }
    }
}
