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
    }
}
