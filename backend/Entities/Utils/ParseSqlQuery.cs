using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Utils
{
    public static class ParseSqlQuery
    {
        public static List<DoctorInfo> GetDoctorsByIdRule(string str)
        {
            var values = str.Split('*');
            var list = new List<DoctorInfo>();
            for (int i = 0; i < (values.Length - 1); i += 4)
            {
                var doctor = new DoctorInfo
                {
                    Id = Convert.ToInt32(values.GetValue(i)),
                    FirstName = values.GetValue(1 + i).ToString(),
                    LastName = values.GetValue(2 + i).ToString(),
                    ProfessionName = values.GetValue(3 + i).ToString(),
                };
                list.Add(doctor);

            }
            return list;
        }

        public static List<DoctorRules> GetRules(string str)
        {
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
            return list;
        }
    }
}
