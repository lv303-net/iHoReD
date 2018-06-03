using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HoReD.Models
{
    public class SalaryCoeffBindingModel
    {
        public int UserId { get; set; }

        public int DoctorId { get; set; }

        public double Coeff { get; set; }

        public DateTime StartDate { get; set; }
        
    }
}
