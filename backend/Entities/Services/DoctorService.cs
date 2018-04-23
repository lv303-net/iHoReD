using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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
            const string cmd = "SELECT_RULES";
            var param = new Dictionary<string, object>()
            {
                {"@FROM", dateStart},
                {"@TILL", dateFinish},
                {"@IDDOCTOR", doctorId}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var result = new List<DoctorRules>();
            var values = str.Split('*');
            for (int i = 0; i < (values.Length - 1); i += 15)
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
                        {DayOfWeek.Friday, bool.Parse(values.GetValue(11 + i).ToString())},
                        {DayOfWeek.Saturday, bool.Parse(values.GetValue(12 + i).ToString())}
                    },
                };
                result.Add(doctorRule);
            }
            _dbContext.Dispose();
            return result;
        }

        public List<string[]> ConvertToEvents(List<DoctorRules> allRules, DateTime dateStart, DateTime dateFinish)
        {
            var events=new List<string[]>();

            foreach (var rule in allRules)
            {
                if (rule.IfInclusive)
                {
                    var tempDate = dateStart;
                    var tempHour = rule.HourStart;
                    while (tempDate <= dateFinish)
                    {
                        if (rule.Week[tempDate.DayOfWeek])
                        {
                            tempHour = rule.HourStart;
                            while (tempHour <= rule.HourFinish)
                            {
                                var inclEvent = new[]
                                {
                                    tempDate.ToString(), tempHour.ToString(),
                                    (tempHour.Add(TimeSpan.FromMinutes(30))).ToString()
                                };
                                tempHour=tempHour.Add(TimeSpan.FromMinutes(30));
                                events.Add(inclEvent);
                            }
                        }
                        tempDate=tempDate.Add(TimeSpan.FromDays(1));
                    }

                }
            }

            foreach (var rule in allRules)
            {
                if (!rule.IfInclusive)
                {
                    var tempDate = dateStart;
                    var tempHour = rule.HourStart;
                    while (tempDate <= rule.PeriodFinish)
                    {
                        if (rule.Week[tempDate.DayOfWeek])
                        {
                            tempHour = rule.HourStart;
                            while (tempHour <= rule.HourFinish)
                            {
                                var excEvent = events.FirstOrDefault(u => u[0] == tempDate.ToString()&&u[1]== tempHour.ToString()&&u[2]== (tempHour.Add(TimeSpan.FromMinutes(30))).ToString());
                                if (excEvent!=null)
                                {
                                    events.Remove(excEvent);
                                }
                                tempHour=tempHour.Add(TimeSpan.FromMinutes(30));
                            }
                        }

                        tempDate = tempDate.Add(TimeSpan.FromDays(1));
                    }
                }
            }
            return events;
        }
    }
}
