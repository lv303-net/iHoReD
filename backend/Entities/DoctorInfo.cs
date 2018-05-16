using System;

namespace Entities
{
    public class DoctorInfo
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ProfessionName { get; set; }

        public TimeSpan StartHour { get; set; }

        public TimeSpan EndHour { get; set; }

        public DateTime EmployingDate { get; set; }

        public string Image { get; set; }
    }
}
