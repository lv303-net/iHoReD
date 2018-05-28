using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ClosedAllergyInfo
    {
        public string AllergyName { get; set; }

        public Tuple<VisitInfo, VisitInfo> OpenigClosingVisitsInfo {get; set;}
    }
}
