using System;
using System.Collections.Generic;

namespace Entities.Services
{
    public interface IDoctorService
    {
        List<DoctorInfo> GetDoctors();

        List<string[]> GetProfessions(bool isStatic);

        List<string[]> GetDoctorsByProfession(string profession);

        List<string[]> GetDoctorsByProfessionId(int professionId);

        List<string[]> GetDoctorSchedule(int doctorId);

        List<DoctorRules> GetDoctorAllRules(int doctorId, DateTime dateStart, DateTime dateFinish);

        List<DoctorRules> GetDoctorRules(List<DoctorRules> allRoles);

        List<string[]> ConvertToEvents(List<DoctorRules> allRules);

        //DoctorRules CompareDoctorRules(DoctorRules exRule, DoctorRules inRule);

        //List<DayofWeek> CompareWeek(IDictionary<DayofWeek, bool> exWeek, IDictionary<DayofWeek, bool> inWeek);
    }
}
