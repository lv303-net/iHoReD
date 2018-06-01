using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HoReD.Models
{
    public class SalaryRateBindingModel
    {
        public int UserId { get; set; }

        public int ProfessionId { get; set; }

        public double Rate { get; set; }

        public DateTime StartDate { get; set; }
        
    }
}
