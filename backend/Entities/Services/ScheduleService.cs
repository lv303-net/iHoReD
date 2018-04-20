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

        public void InsertScheduleRecord(int IdDoctor, int IdPatient, string startDateTime, string endDateTime)
        {
            const string cmd = "INSERT_SCHEDULE_RECORD";

            DateTime startDayTime = Convert.ToDateTime(startDateTime);
            DateTime endDayTime = Convert.ToDateTime(endDateTime);

            var param = new Dictionary<string, object>()
            {
                {"@IDDOCTOR", IdDoctor},
                {"@IDPATIENT", IdPatient},
                {"@START_DATETIME", startDayTime},
                {"@END_DATETIME",endDayTime}
            };

            _dbContext.Insert(cmd, param);

            _dbContext.Dispose();
        }
    }
}
