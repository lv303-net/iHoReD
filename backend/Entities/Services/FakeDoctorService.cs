using System;
using System.Collections.Generic;

namespace Entities.Services
{
    public class FakeDoctorService: IDoctorService
    {
        public List<DoctorInfo> GetDoctors()
        {
            var list = new List<DoctorInfo>();
            var doctor1 = new DoctorInfo
            {
                Id = 1,
                FirstName = "name1",
                LastName = "name2",
                ProfessionName = "therapist",
                EmployingDate = new DateTime(2018, 12, 25, 10, 30, 50),
                StartHour = new TimeSpan(5, 15, 15),
                EndHour = new TimeSpan(5, 15, 15),
                Image = "1.jpg"
            };
            var doctor2 = new DoctorInfo
            {
                Id = 2,
                FirstName = "name3",
                LastName = "name4",
                ProfessionName = "therapist",
                EmployingDate = new DateTime(2012, 12, 25, 10, 30, 50),
                StartHour = new TimeSpan(5, 15, 15),
                EndHour = new TimeSpan(5, 15, 15),
                Image = "2.jpg"
            };
            list.Add(doctor1);
            list.Add(doctor2);
            return list;
        }

        public List<string[]> GetProfessions(bool isStatic)
        {
            var list = new List<string[]>();
            list.Add(new string[] { "therapist","1" });
            list.Add(new string[] { "dentist", "2" });
            list.Add(new string[] { "ophtalmologist", "3" });
            return list;
        }

        public List<string[]> GetDoctorsByProfession(string profession)
        {
            var list = new List<string[]>();
            var prof1 = new[] { "Halenok", "Iryna" };
            var prof2 = new string[] { "Solyar", "Olya" };
            list.Add(prof1);
            list.Add(prof2);
            return list;
        }
        public List<string[]> GetDoctorsByProfessionId(int professionId)
        {
            var list = new List<string[]>();
            var prof1 = new[] { "Halenok", "Iryna" };
            var prof2 = new string[] { "Solyar", "Olya" };
            list.Add(prof1);
            list.Add(prof2);
            return list;
        }

        public List<string[]> GetDoctorSchedule(int doctorId)
        {
            throw new NotImplementedException();
        }

        public List<DoctorRules> GetDoctorRules(List<DoctorRules> allRules)
        {
            var list = new List<DoctorRules>();
            return list;
        }

        public List<DoctorRules> GetDoctorAllRules(int doctorId, DateTime dateStart, DateTime dateFinish)
        {
            var list = new List<DoctorRules>();
            return list;
        }

        public List<string[]> ConvertToEvents(List<DoctorRules> allRules)
        {
            var list = new List<string[]>();
            return list;
        }

        public DoctorRules CompareDoctorRules(DoctorRules exRule, DoctorRules inRule)
        {
            var list = new DoctorRules();
            return list;
        }

        public List<DayofWeek> CompareWeek(IDictionary<DayofWeek, bool> exWeek, IDictionary<DayofWeek, bool> inWeek)
        {
            var list = new List<DayofWeek>();
            return list;
        }
    }
}
