using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HoReD.Models
{
    public class SalaryBindingModel
    {
        public int professionId { get; set; }

        public double rate { get; set; }

        public DateTime startDate { get; set; }
        
    }
}
