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
        string DeleteRate(int professionId, DateTime startDate);
        void AddRate(int professionId, double rate, DateTime startDate);
        string EditRate(int professionId, double rate, DateTime startDate);
    }
}
