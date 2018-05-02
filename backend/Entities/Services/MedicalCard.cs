using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class MedicalCard
    {
        public int CardId { get; set; }
        public string Description { get; set; }
        public string Cure { get; set; }
        public int IdDoctor { get; set; }
        public int IdPatient { get; set; }
        public DateTime StartDateTime { get; set; }
        public int IdVisit { get; set; }
        public string DiseaseCode { get; set; }
    }
}
