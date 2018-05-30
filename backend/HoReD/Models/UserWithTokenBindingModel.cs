using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HoReD.Models
{
    public class UserWithTokenBindingModel
    {
        public string Email { get; set; }

        public string Token { get; set; }
    }
}