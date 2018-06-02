using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface ISalaryService
    {
        List<SalaryRate> GetRatesForProfession(int professionId);
        int DeleteRate(int professionId, DateTime startDate);
        int AddRate(int professionId, double rate, DateTime startDate, int iserId);
        int EditRate(int professionId, double rate, DateTime startDate, int userId);

        List<SalaryCoeff> GetCoefficientsForDoctor(int doctorId);
        int DeleteCoeff(int doctorId, DateTime startDate);
        int AddCoeff(int doctorId, double coeff, DateTime startDate);
        int EditCoeff(int doctorId, double coeff, DateTime startDate);
    }
}
