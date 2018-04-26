using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities.Services;
using HoReD.Models;

namespace HoReD.Controllers
{
    public class RegistrationController : ApiController
    {
        private readonly IUserService _userService;

        public RegistrationController(IUserService userService)
        {
            _userService = userService;
        }

        //Adds to system inforation about new user
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult CreateNewUser(RegistrationBindingModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Conflict();
                }
                
                _userService.StoringInfoAboutNewUser(model.FirstName, model.LastName, model.Email, model.Password, model.Phone);

                EmailNotificationService.sendEmail(_userService.GetUserInfo(model.Email));

                return Ok();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("Registration/{encryptedUserId}")]
        public IHttpActionResult ActivateUser(string encryptedUserId)
        {
            try
            {
                int decryptedUserId = Convert.ToInt32(EncryptionService.Decrypt(encryptedUserId));
                _userService.ActivateUser(decryptedUserId);
                return Ok();
            }   
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}
