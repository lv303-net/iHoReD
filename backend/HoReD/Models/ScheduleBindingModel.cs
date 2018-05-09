using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HoReD.Models
{
    public class ScheduleBindingModel
    {
        public int IdDoctor { get; set; }

        public int IdPatient { get; set; }

        public DateTime startDateTime { get; set; }

        public DateTime endDateTime { get; set; }
    }
}
