using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HoReD.Models
{
    public class BookedEventBindingModel : EventBindingModel
    {
        public string PatientName { get; set; }
        public int PatientId { get; set; }
    }
}
