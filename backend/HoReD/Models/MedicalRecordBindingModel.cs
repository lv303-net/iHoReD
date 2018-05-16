using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HoReD.Models
{
    public class MedicalRecordBindingModel
    {
        public int IdPatient { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Description { get; set; }

        public string Treatment { get; set; }

        public int Allergy { get; set; }

        public int Disease { get; set; }
    }
}