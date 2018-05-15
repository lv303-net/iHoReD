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
        List<Allergy> GetPatientActiveAllergies(int id);
        List<Allergy> GetPatientNonActiveAllergies(int id);
        List<IllnessCategory> GetCategories();
        List<IllnessSubCategory> GetSubCategories(int idCategory);
        List<IllnessDiseases> GetDiseasies(int idSubCategory);
        List<IllnessSubDiseases> GetPatientSubDiseasies(int idPatient, int idDisease);
        int AddMedicalRecord(int idPatient, DateTime startTime, string description, string treatment);
        int AddPatientAllergy(int id, DateTime startTime, int allergy);
        int AddPatientDisease(int id, DateTime startTime, int disease);
        int ClosePatientDisease(int id, int disease, DateTime endTime);
        int ClosePatientAllergy(int id, int ellergy, DateTime endTime);
    }
}
