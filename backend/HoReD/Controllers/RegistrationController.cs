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
    /// <summary>
    /// Adds information to database during registration and manages users' activation
    /// </summary>
    public class RegistrationController : ApiController
    {
        private readonly IUserService _userService;

        public RegistrationController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Adds to system information about new user
        /// </summary>
        /// <param name="model">Information about user</param>
        /// <returns>Status code</returns>
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

        /// <summary>
        /// Activates user, that visited own activation link
        /// </summary>
        /// <param name="IdUser">ID of the needed user</param>
        /// <returns>Integer: 0 - if user already activated, 1 - if activation succeeded, -1 - if such user doesn't exist in database</returns>
       
        [HttpGet]
        [AllowAnonymous]
        [Route("Registration/{IdUser}")]
        public IHttpActionResult ActivateUser(string IdUser)
        {
            try
            {
                int decryptedUserId = Convert.ToInt32(EncryptionService.Decrypt(IdUser));
               int result=_userService.ActivateUser(decryptedUserId);
                return Ok(result);
            }   
            catch (Exception e )
            {
                Console.WriteLine(e);
                throw;
               
            }
        }
    }
}
