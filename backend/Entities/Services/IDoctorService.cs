using System;
using System.Collections.Generic;

namespace Entities.Services
{
    public interface IDoctorService
    {
        List<DoctorInfo> GetDoctors();

        List<string[]> GetProfessions(bool isStatic);

        List<string[]> GetAllProfessions();

        List<string[]> GetDoctorsByProfession(string profession);

        List<string[]> GetDoctorsByProfessionId(int professionId);

        List<string[]> GetDoctorSchedule(int doctorId);

        List<DoctorRules> GetDoctorAllRules(int doctorId, DateTime dateStart, DateTime dateFinish);

        List<string[]> ConvertToEvents(List<DoctorRules> allRules, DateTime dateStart, DateTime dateFinish);

        List<Event> GetPrimaryEventsAsFaked(List<string[]> events);

        List<Event> GetDoctorBookedEvents(int IdDoctor, DateTime dateStart, DateTime dateFinish);

        List<Tuple<Event, User>> GetGeneralEventsListForDoctor(int IdDoctor, DateTime dateStart, DateTime dateFinish);

        List<Tuple<Event,User>> GetDoctorBookedEventsForDoctor(int IdDoctor, DateTime dateStart, DateTime dateFinish);

        List<Tuple<Event, User>> GeneralEventsListFillUserData(List<Tuple<Event, User>> general);

        List<Event> GetGeneralEventsList(int IdDoctor, DateTime dateStart, DateTime dateFinish);

        List<SalaryStatistics> GetDoctorSalaryStatistics(int IdDoctor, DateTime dateStart, DateTime dateFinish);

        List<SalaryStatistics> GetDoctorSalaryStatisticsForMonth(int IdDoctor, DateTime dayInMonth);

    }
}
