using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface IPatientDataService
    {
        List<PatientData> GetPatientDataById(int id);
        List<string> GetPatientAllergies(int id);
        List<string> GetPatientDiseases(int id);
        int AddMedicalRecord(int idPatient, DateTime StartTime, string Description, string Treatment);
        int AddPatientAllergy(int Id, DateTime StartTime, int Allergy);
        int AddPatientDisease(int Id, DateTime StartTime, int Disease);
        int ClosePatientDisease(int Id, int Disease, DateTime EndTime);
        int ClosePatientAllergy(int Id, int Allergy, DateTime EndTime);
    }
}
