using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly IDbContext _dbContext;

        public ScheduleService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int InsertScheduleRecord(int IdDoctor, int IdPatient, DateTime startDateTime, DateTime endDateTime)
        {
            const string cmd = "INSERT_SCHEDULE_RECORD";

            if (startDateTime <= DateTime.Now)
                return 0;
            if (IdDoctor == IdPatient)
                return -3;
            if (startDateTime >= endDateTime)
                return -4;

            var param = new Dictionary<string, object>()
            {
                {"@IDDOCTOR", IdDoctor},
                {"@IDPATIENT", IdPatient},
                {"@START_DATETIME", startDateTime},
                {"@END_DATETIME",endDateTime}
            };
            return (_dbContext.ExecuteQuery(cmd, param));
        }
    }
}
