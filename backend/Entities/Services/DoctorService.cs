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
            return list;
        }

        public List<string[]> GetAllProfessions()
        {
            const string cmd = "GET_PROFESSIONS";
            var param = new Dictionary<string, object>()
            {
                {"@Is_Static", true}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var list = new List<string[]>();
            for (int i = 0; i < values.Length - 2; i += 3)
            {
                string[] name = { values.GetValue(i).ToString(), values.GetValue(i + 1).ToString(), values.GetValue(i + 2).ToString() };
                list.Add(name);
            }

            param = new Dictionary<string, object>()
            {
                {"@Is_Static", false}
            };
            str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            values = str.Split('*');
            for (int i = 0; i < values.Length - 2; i += 3)
            {
                string[] name = { values.GetValue(i).ToString(), values.GetValue(i + 1).ToString(), values.GetValue(i + 2).ToString() };
                list.Add(name);
            }
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
            for (int i = 0; i < (values.Length - 1); i += 3)
            {
                string[] name = { values.GetValue(0 + i).ToString(), values.GetValue(1 + i).ToString(),values.GetValue(2+i).ToString()};
                list.Add(name);

            }
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
            return list;
        }

        public List<DoctorRules> GetDoctorAllRules(int doctorId,DateTime dateStart,DateTime dateFinish)
        {
            if((dateFinish.DayOfYear-dateStart.DayOfYear)<6)
            {
                dateFinish = dateStart;
            }
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
            return result;
        }

        public List<string[]> ConvertToEvents(List<DoctorRules> allRules, DateTime dateStart, DateTime dateFinish)
        {
            return ((dateFinish.DayOfYear - dateStart.DayOfYear) >= Utils.StaticData.MinimalNumberOfDaysInMonth ?
                ConvertToEventsForMonth(allRules, dateStart, dateFinish) : ConvertToEventsForDays(allRules, dateStart, dateFinish));
        }

        public List<string[]> ConvertToEventsForDays(List<DoctorRules> allRules, DateTime dateStart, DateTime dateFinish)
        {

            var events = new List<string[]>();
            string pattern = Utils.StaticData.DatePattern;

            foreach (var rule in allRules)
            {
                var tempHour = rule.HourStart;
                var tempDateStart = new DateTime();
                var tempDateFinish = new DateTime();
                if (dateStart > rule.PeriodStart)
                {
                    tempDateStart = dateStart;
                }
                else
                {
                    tempDateStart = rule.PeriodStart;
                }
                if (dateFinish < rule.PeriodFinish)
                {
                    tempDateFinish = dateFinish;
                }
                else
                {
                    tempDateFinish = rule.PeriodFinish;
                }
                while (tempDateStart < tempDateFinish)
                {
                    if (rule.Week[tempDateStart.DayOfWeek])
                    {
                        tempHour = rule.HourStart;
                        while (tempHour < rule.HourFinish)
                        {
                            if (rule.IfInclusive)
                            {
                                var convertDate = tempDateStart.ToString(pattern);

                                var inclEvent = new[]
                                {
                                convertDate.ToString(), tempHour.ToString(),
                                (tempHour.Add(TimeSpan.FromMinutes(30))).ToString()
                                };

                                var tempInclEvent = events.FirstOrDefault(u => u[0] == convertDate.ToString() && TimeSpan.Parse(u[1]) == tempHour && TimeSpan.Parse(u[2]) == tempHour.Add(TimeSpan.FromMinutes(30)));
                                if (tempInclEvent == null)
                                {
                                    events.Add(inclEvent);
                                }
                            }
                            else
                            {
                                var convertDate = tempDateStart.ToString(pattern);
                                var excEvent = events.FirstOrDefault(u => u[0] == convertDate.ToString() && TimeSpan.Parse(u[1]) <= tempHour && TimeSpan.Parse(u[2]) >= tempHour.Add(TimeSpan.FromMinutes(30)));
                                if (excEvent != null)
                                {
                                    events.Remove(excEvent);
                                }
                            }
                            tempHour = tempHour.Add(TimeSpan.FromMinutes(30));
                        }
                    }
                    tempDateStart = tempDateStart.Add(TimeSpan.FromDays(1));
                }
                
            }
            return events;
        }

        public List<string[]> ConvertToEventsForMonth(List<DoctorRules> allRules, DateTime dateStart, DateTime dateFinish)
        {
            var events = new List<string[]>();

            string pattern = Utils.StaticData.DatePattern;

            foreach (var rule in allRules)
            {
                var tempDateStart = new DateTime();
                var tempDateFinish = new DateTime();
                if (dateStart > rule.PeriodStart)
                {
                    tempDateStart = dateStart;
                }
                else
                {
                    tempDateStart = rule.PeriodStart;
                }
                if (dateFinish < rule.PeriodFinish)
                {
                    tempDateFinish = dateFinish;
                }
                else
                {
                    tempDateFinish = rule.PeriodFinish;
                }
                while (tempDateStart < tempDateFinish)
                {
                    if (rule.Week[tempDateStart.DayOfWeek])
                    {
                        if (rule.IfInclusive)
                        {
                            var convertDate = tempDateStart.ToString(pattern);
                            var inclEvent = new[]
                            {
                                convertDate.ToString(), rule.HourStart.ToString(),
                                rule.HourFinish.ToString()
                            };

                            var tempInclEvent = events.FirstOrDefault(u => u[0] == convertDate.ToString() && TimeSpan.Parse(u[1]) == rule.HourStart && TimeSpan.Parse(u[2]) == rule.HourFinish.Add(TimeSpan.FromMinutes(30)));
                            if (tempInclEvent == null)
                            {
                                events.Add(inclEvent);
                            }
                        }
                        else
                        {
                            var convertDate = tempDateStart.ToString(pattern);
                            var excEvent = events.FirstOrDefault(u => u[0] == convertDate.ToString() && TimeSpan.Parse(u[1]) >= rule.HourStart && TimeSpan.Parse(u[2]) <= rule.HourFinish);
                            if (excEvent != null)
                            {
                                events.Remove(excEvent);
                            }
                        }
                    }
                    tempDateStart = tempDateStart.Add(TimeSpan.FromDays(1));
                }
            }
            return events;
        }

        public List<Event> GetPrimaryEventsAsFaked(List<string[]> primaryEvents)
        {
            var events = new List<Event>();

            foreach(var e in primaryEvents)
            {
                var fakedEvent = new Event()
                {
                    dateTime = e,
                    isFake = true
                };
                events.Add(fakedEvent);
            }
            return events;
        }

        public List<Event> GetDoctorBookedEvents(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            const string cmd = "GET_DOCTOR_SCHEDULE_BOOKED";

            var param = new Dictionary<string, object>()
            {
                {"@IDDOCTOR", IdDoctor},
                {"@PERIOD_START", dateStart},
                {"@PERIOD_END",  dateFinish}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);

            return Utils.ParseSqlQuery.GetDoctorBookedEvents(str);
        }

        public List<Event> GetEventsListForDays(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            var rules = GetDoctorAllRules(IdDoctor, dateStart, dateFinish);
            var fakedEvents = GetPrimaryEventsAsFaked(ConvertToEventsForDays(rules, dateStart, dateFinish));
            var bookedEvents = GetDoctorBookedEvents(IdDoctor, dateStart, dateFinish);

            var generalEvents = new List<Event>();
            bool isBooked;

            foreach (var faked in fakedEvents)
            {
                isBooked = false;
                foreach (var booked in bookedEvents)
                {
                    if(faked.dateTime[0].Equals(booked.dateTime[0]) && faked.dateTime[1].Equals(booked.dateTime[1]) && faked.dateTime[2].Equals(booked.dateTime[2]))
                    {
                        generalEvents.Add(booked);
                        isBooked = true;
                        break;
                    }
                }
                if(!isBooked)
                {
                    generalEvents.Add(faked);
                }
            }
            return generalEvents;
        }

        /// <summary>
        /// Almost equal for GetDoctorBookedEvents, although returns also name,surname and id of patient, that booked smth relevant session in schedule
        /// </summary>
        /// <param name="IdDoctor"></param>
        /// <param name="dateStart"></param>
        /// <param name="dateFinish"></param>
        /// <returns></returns>
        public List<Tuple<Event,User>> GetDoctorBookedEventsForDoctor(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            
            const string cmd = "GET_DOCTOR_SCHEDULE_BOOKED";

            var param = new Dictionary<string, object>()
            {
                {"@IDDOCTOR", IdDoctor},
                {"@PERIOD_START", dateStart},
                {"@PERIOD_END",  dateFinish}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var toRet = Utils.ParseSqlQuery.GetDoctorBookedEventsForDoctor(str);
            
            return toRet;
        }

        /// <summary>
        /// Fills Users' firstname and lastname, based on their Id
        /// </summary>
        /// <param name="general"></param>
        /// <returns></returns>
        public List<Tuple<Event, User>> GeneralEventsListFillUserData(List<Tuple<Event, User>> general)
        {
            var toRet = new List<Tuple<Event, User>>();
            foreach (var g in general)
            {
                if (g.Item2.Id == 0) continue;
                const string cmd = "GET_ALL_USER_INFO";
                var param = new Dictionary<string, object>()
                {
                    {"@ID", g.Item2.Id},
                };
                var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
                UserInfo userInfo = Utils.ParseSqlQuery.GetAllUserInfo(str);
                g.Item2.FirstName = userInfo.FirstName;
                g.Item2.LastName = userInfo.LastName;
            }
            toRet = general;
            return toRet;
        }

        public List<Event> GetEventsListForMonth(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            var generalEvents = GetEventsListForDays(IdDoctor, dateStart, dateFinish);
            var generalEventsForMonth = new List<Event>();

            bool isAvailibleForBooking;
            int j = 0;
            for (int i = 0; i < generalEvents.Count(); i = j)
            {
                var perDayEvent = new Event()
                {
                    dateTime = generalEvents[i].dateTime,
                    isFake = generalEvents[i].isFake
                };

                isAvailibleForBooking = perDayEvent.isFake;

                for (j = i + 1; j < generalEvents.Count(); j++)
                {
                    if (generalEvents[i].dateTime[0].ToString().Equals(generalEvents[j].dateTime[0].ToString()))
                    {
                        perDayEvent.dateTime[2] = generalEvents[j].dateTime[2];
                        if (generalEvents[j].isFake)
                        {
                            isAvailibleForBooking = true;
                        }
                    }
                    else
                    {
                        break;
                    }

                }
                perDayEvent.isFake = isAvailibleForBooking;
                generalEventsForMonth.Add(perDayEvent);
            }

            return generalEventsForMonth;
        }

        public List<Event> GetGeneralEventsList(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            return ((dateFinish.DayOfYear - dateStart.DayOfYear) >= Utils.StaticData.MinimalNumberOfDaysInMonth ? 
                GetEventsListForMonth(IdDoctor, dateStart, dateFinish) : GetEventsListForDays(IdDoctor, dateStart, dateFinish));
        }

        public List<Tuple<Event,User>> GetEventsListForDaysForDoctor(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            List<Tuple<Event, User>> toRet = new List<Tuple<Event, User>>();

            var rules = GetDoctorAllRules(IdDoctor, dateStart, dateFinish);
            var fakedEvents = GetPrimaryEventsAsFaked(ConvertToEventsForDays(rules, dateStart, dateFinish));
            var bookedEvents = GetDoctorBookedEventsForDoctor(IdDoctor, dateStart, dateFinish);

            var generalEvents = new List<Tuple<Event, User>>();
            bool isBooked;
            foreach (var faked in fakedEvents)
            {
                isBooked = false;
                foreach (var booked in bookedEvents)
                {
                    if (faked.dateTime[0].Equals(booked.Item1.dateTime[0]) && faked.dateTime[1].Equals(booked.Item1.dateTime[1]) && faked.dateTime[2].Equals(booked.Item1.dateTime[2]))
                    {
                        generalEvents.Add(booked);
                        isBooked = true;
                        break;
                    }
                }
                if (!isBooked)
                {
                    generalEvents.Add(new Tuple<Event, User>(faked, new User() { Id = 0, FirstName = "", LastName = "" }));
                }
            }

            generalEvents = GeneralEventsListFillUserData(generalEvents);

            return generalEvents;
        }

        public List<Tuple<Event,User>> GetEventsListForMonthForDoctor(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            var generalEvents = GetEventsListForDaysForDoctor(IdDoctor, dateStart, dateFinish);
            var generalEventsForMonth = new List<Tuple<Event,User>>();

            bool isAvailibleForBooking;
            int j = 0;
            for (int i = 0; i < generalEvents.Count(); i = j)
            {
                var perDayTuple = new Tuple<Event, User>(new Event()
                {
                    dateTime = generalEvents[i].Item1.dateTime,
                    isFake = generalEvents[i].Item1.isFake
                },
                new User()
                {
                    Id = generalEvents[i].Item2.Id,
                    FirstName = generalEvents[i].Item2.FirstName,
                    LastName = generalEvents[i].Item2.LastName
                }
                );

                isAvailibleForBooking = perDayTuple.Item1.isFake;

                for (j = i + 1; j < generalEvents.Count(); j++)
                {
                    if (generalEvents[i].Item1.dateTime[0].ToString().Equals(generalEvents[j].Item1.dateTime[0].ToString()))
                    {
                        perDayTuple.Item1.dateTime[2] = generalEvents[j].Item1.dateTime[2];
                        if (generalEvents[j].Item1.isFake)
                        {
                            isAvailibleForBooking = true;
                        }
                    }
                    else
                    {
                        break;
                    }

                }
                perDayTuple.Item1.isFake = isAvailibleForBooking;
                generalEventsForMonth.Add(perDayTuple);
            }
            var count = generalEventsForMonth.Count(x => x.Item2.Id != 0);
            return generalEventsForMonth;
        }

        public List<Tuple<Event,User>> GetGeneralEventsListForDoctor(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            return ((dateFinish.DayOfYear - dateStart.DayOfYear) >= Utils.StaticData.MinimalNumberOfDaysInMonth ?
                GetEventsListForMonthForDoctor(IdDoctor, dateStart, dateFinish) : GetEventsListForDaysForDoctor(IdDoctor, dateStart, dateFinish));
        }

        public List<SalaryStatistics> GetDoctorSalaryStatistics(int IdDoctor, DateTime dateStart, DateTime dateFinish)
        {
            if (dateFinish > DateTime.Now)
            {
                dateFinish = DateTime.Now;
            }

            const string cmd = "GET_SALARY_STATISTICS_FOR_PERIOD";

            var param = new Dictionary<string, object>()
            {
                {"@DOCTOR_ID", IdDoctor},
                {"@START_DATE", dateStart},
                {"@END_DATE",  dateFinish}
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);

            return Utils.ParseSqlQuery.GetDoctorSalaryStatistics(str);
        }

    }
}
