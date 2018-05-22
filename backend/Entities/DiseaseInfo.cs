using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DiseaseInfo 
    {
        public string DoctorOpenFirstName { get; set; }

        public string DoctorOpenLastName { get; set; }

        public DateTime StartDateTime { get; set; }

        public string Description { get; set; }

        public string Treatment { get; set; }

        public string DoctorCloseFirstName { get; set; }

        public string DoctorCloseLastName { get; set; }

        public DateTime EndDateTime { get; set; }
    }
}
