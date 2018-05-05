using System;

namespace Entities
{
    public class MedicalCard
    {
        public int CardId { get; set; }
        public string Description { get; set; }
        public string Cure { get; set; }
        public string DoctorFirstname { get; set; }
        public string Doctorlastname { get; set; }
        public int IdPatient { get; set; }
        public DateTime StartDateTime { get; set; }
        public int IdVisit { get; set; }
        public string DiseaseName { get; set; }
    }
}
