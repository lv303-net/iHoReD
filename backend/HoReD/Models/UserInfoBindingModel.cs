using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HoReD.Models
{
    public class UserInfoBindingModel
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string IsActivated { get; set; }

        public string Phone { get; set; }

        public string Sex { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Street { get; set; }

        public string Apartment { get; set; }
    }
}