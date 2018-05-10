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
        int AddRate(int professionId, double rate, DateTime startDate);
        int EditRate(int professionId, double rate, DateTime startDate);
    }
}
