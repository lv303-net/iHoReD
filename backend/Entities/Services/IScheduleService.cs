using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface IScheduleService
    {
        void InsertScheduleRecord(int IdDoctor, int IdPatient, string startDateTime, string endDateTime);
    }
}
