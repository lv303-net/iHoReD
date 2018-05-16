using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class SalaryStatistics
    {
        public DateTime? Day { get; set; }

        public double WorkedHours { get; set; }

        public double SalaryRate { get; set; } // depend on proffesion

        public double SalaryCoefficient { get; set; } // depend on doctor

        public double EarnedMoney { get; set; } 
    }
}
