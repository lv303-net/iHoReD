using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HoReD.Models
{
    public class RegistrationBindingModel
    {
        [Required(AllowEmptyStrings = false)]
        [RegularExpression(@"[A-Za-z]{2,30}")]
        public string FirstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [RegularExpression(@"[A-Za-z]{2,30}")]
        public string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [EmailAddress]
        [MinLength(2)]
        [MaxLength(40)]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false)]
        [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,30}$")]
        public string Password { get; set; }

        /*[Required(AllowEmptyStrings = false)]
        [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,30}$")]
        public string ConfirmPassword { get; set; }*/

        [Required(AllowEmptyStrings = false)]
        [RegularExpression(@"^(\+[0-9]{12})$|^([0-9]{10})$")]
        public string Phone { get; set; }
    }
}
