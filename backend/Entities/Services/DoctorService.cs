using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Entities.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDbContext _dbContext;

        public DoctorService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public List<DoctorInfo> GetDoctors()
        {
            const string cmd = "GETINFOABOUTDOCTORS";
            var param=new Dictionary<string,object>();
            var str = _dbContext.ExecuteSqlQuery(cmd, '*',param);
            var values = str.Split('*');
            var list = new List<DoctorInfo>();
            for (int i = 0; i < (values.Length-1); i+=8)
            {
                var doctor = new DoctorInfo
                {
                    Id = Convert.ToInt32(values.GetValue(0 + i)),
                    FirstName = values.GetValue(1 + i).ToString(),
                    LastName = values.GetValue(i + 2).ToString(),
                    ProfessionName = values.GetValue(i + 3).ToString(),
                    StartHour = TimeSpan.Parse(values.GetValue(i + 4).ToString()),
                    EndHour = TimeSpan.Parse(values.GetValue(i + 5).ToString()),
                    EmployingDate = Convert.ToDateTime(values.GetValue(i + 6).ToString()),
                    Image = values.GetValue(i + 7).ToString()
                };
                list.Add(doctor);

            }
            _dbContext.Dispose();
            return list;
        }

        public List<string[]> GetProfessions(bool isStatic)
        {
            const string cmd = "GET_PROFESSIONS";
            var param = new Dictionary<string, object>()
            {
                {"@Is_Static", isStatic}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*',param);
            var values = str.Split('*');
            var list = new List<string[]>();
            for (int i = 0; i < values.Length-2; i += 3)
            {
                string[] name = { values.GetValue(i).ToString(), values.GetValue(i + 1).ToString(), values.GetValue(i + 2).ToString() };
                list.Add(name);
            }
            _dbContext.Dispose();
            return list;
        }

        public List<string[]> GetDoctorsByProfession(string profession)
        {
            const string cmd = "Get_Doctors_With_Some_Profession";
            var param = new Dictionary<string, object>()
            {
                {"@Profession_Name", profession}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<string[]>();
            for (int i = 0; i < (values.Length-1); i+=2)
            {
                string[] name = {values.GetValue(0+i).ToString(), values.GetValue(1+i).ToString()};
                list.Add(name);

            }
            _dbContext.Dispose();
            return list;
        }
        public List<string[]> GetDoctorsByProfessionId(int professionId)
        {
            const string cmd = "GET_DOCTORS_BY_PROFESSION_ID";
            var param = new Dictionary<string, object>()
            {
                {"@PROFESSION_ID", professionId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<string[]>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                string[] name = { values.GetValue(0 + i).ToString(), values.GetValue(1 + i).ToString() };
                list.Add(name);

            }
            _dbContext.Dispose();
            return list;
        }

        public List<string[]> GetDoctorSchedule(int doctorId)
        {
            const string cmd = "GET_WORKING_HOURS";
            var param = new Dictionary<string, object>()
            {
                {"@IDDoctors", doctorId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var result = new List<TimeSpan>();
            var values = str.Split('*');
            var starttime = TimeSpan.Parse(values[0]);
            var endtime = TimeSpan.Parse(values[1]);
            var ts = TimeSpan.FromMinutes(30);
            while (starttime < endtime)
            {
                starttime = starttime.Add(ts);
                result.Add(starttime);
            }

            var list = new List<string[]>();
            var dt = DateTime.Now.ToString("yyyy-MM-dd");
            for (int i = 0, j = 0; i < result.Count - 1; i += 1)
            {
                string[] name = { dt + "T" + result[i].ToString(), dt + "T" + result[++j].ToString() };
                list.Add(name);
            }
            _dbContext.Dispose();
            return list;
        }

        public List<DoctorRules> GetDoctorAllRules(int doctorId,DateTime dateStart,DateTime dateFinish)
        {
            const string cmd = "";
            var param = new Dictionary<string, object>()
            {
                {"@IDDoctors", doctorId},
                {"@DATESTART", dateStart},
                {"@DATEFINISH", dateFinish}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var result = new List<DoctorRules>();
            var values = str.Split('*');
            for (int i = 0; i < (result.Count - 1); i += 12)
            {
                var doctorRule = new DoctorRules()
                {
                    RuleName = values.GetValue(0 + i).ToString(),
                    HourStart = TimeSpan.Parse(values.GetValue(1 + i).ToString()),  
                    HourFinish = TimeSpan.Parse(values.GetValue(2 + i).ToString()),
                    PeriodStart = DateTime.Parse(values.GetValue(3 + i).ToString()),
                    PeriodFinish = DateTime.Parse(values.GetValue(4 + i).ToString()),
                    IfInclusive = bool.Parse(values.GetValue(5 + i).ToString()),
                    Week = new Dictionary<DayOfWeek, bool>
                    {
                        {DayOfWeek.Sunday, bool.Parse(values.GetValue(6 + i).ToString())},
                        {DayOfWeek.Monday, bool.Parse(values.GetValue(7 + i).ToString())},
                        {DayOfWeek.Tuesday, bool.Parse(values.GetValue(8 + i).ToString())},
                        {DayOfWeek.Wednesday, bool.Parse(values.GetValue(9 + i).ToString())},
                        {DayOfWeek.Thursday, bool.Parse(values.GetValue(10 + i).ToString())},
                        {DayOfWeek.Friday, bool.Parse(values.GetValue(11 + i).ToString())}
                    },
                };
                result.Add(doctorRule);
            }
            _dbContext.Dispose();
            return result;
        }

        public List<string[]> ConvertToEvents(List<DoctorRules> allRules)
        {
            var events=new List<string[]>();

            foreach (var rule in allRules)
            {
                if (!rule.IfInclusive)
                {
                    var tempDate = rule.PeriodStart;
                    var tempHour = rule.HourStart;
                    while (tempDate <= rule.PeriodFinish)
                    {
                        if (rule.Week[tempDate.DayOfWeek])
                        {
                            tempHour = rule.HourStart;
                            while (tempHour <= rule.HourFinish)
                            {
                                foreach (var incEvent in events)
                                {
                                    var excEvent = new[]
                                    {
                                        tempDate.ToString(), tempHour.ToString(),
                                        (tempHour.Add(TimeSpan.FromMinutes(30))).ToString()
                                    };
                                    if (events.Contains(excEvent))
                                    {
                                        events.Remove(excEvent);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return events;
        }

        public DoctorRules CompareDoctorRules(DoctorRules exRule, DoctorRules inRule)
        {
            var res = new DoctorRules();
            if ((exRule.PeriodStart > inRule.PeriodFinish) || (exRule.PeriodFinish < inRule.PeriodStart))
            {
                return inRule;
            }
            else
            {
                if ((exRule.HourStart > inRule.HourFinish) || (exRule.HourFinish < inRule.HourStart))
                {
                    return inRule;
                }
                else
                {
                    if (CompareWeek(exRule.Week, inRule.Week).Count == 0)
                    {
                        return inRule;
                    }
                    else
                    {

                    }

                }
            }

            return res;
        }

        public List<DayOfWeek> CompareWeek(IDictionary<DayOfWeek, bool> exWeek, IDictionary<DayOfWeek, bool> inWeek)
        {
            throw new NotImplementedException();
        }
    }
}
