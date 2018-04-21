using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DoctorRules
    {
        public string RuleName { get; set; }

        public TimeSpan HourStart { get; set; }

        public TimeSpan HourFinish { get; set; }

        public DateTime PeriodStart { get; set; }

        public DateTime PeriodFinish { get; set; }

        public bool IfInclusive { get; set; }

        public IDictionary<DayOfWeek,bool> Week { get; set; }
    }
}
