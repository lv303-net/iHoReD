using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface ISalaryService
    {
        List<string[]> GetRatesForProfession(int professionId);
    }
}
