using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class VisitInfo
    {
        public string DoctorFirstName { get; set; }

        public string DoctorLastName { get; set; }

        public DateTime StartDateTime { get; set; }

        public string Description { get; set; }

        public string Treatment { get; set; }
    }
}
