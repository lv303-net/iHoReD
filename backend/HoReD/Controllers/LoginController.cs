using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using Entities.Services;
using HoReD.Models;

namespace HoReD.Controllers
{
    /// <summary>
    /// Manages the logining process of users
    /// </summary>
    public class LoginController : ApiController
    {
        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Checks whether entered user data is valid
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult LoginUser(LoginUserBindingModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Conflict();
                }

                var currentUser = _userService.GetUserInfo(model.Email);
                var passwordRegForm = model.Password;
                var isPasswordEqual = Hashing.VerifyPassword(passwordRegForm, currentUser.Password);
                if (isPasswordEqual)
                {
                    return Ok(currentUser);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Sends email with uniquely generated link that have expiration time to provide ability reset password
        /// </summary>
        /// <param name="model">Email address where send link to</param>
        /// <example>http://localhost:*****/SendEmailForResettingPassword</example>
        [AllowAnonymous]
        [Route("SendEmailForResettingPassword")]
        public IHttpActionResult SendEmailForResettingPassword(LoginUserBindingModel model)
        {
            try
            {
                _userService.SendEmailForResettingPassword(model.Email);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Resets password after validation link, email address and new password
        /// </summary>
        /// <param name="model">Email, new password and link for resetting from email</param>
        /// <example>http://localhost:*****/ResetPassword</example>
        [AllowAnonymous]
        [Route("ResetPassword")]
        public IHttpActionResult ResetPassword(ResetPasswordBindingModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return Conflict();

                return Ok(_userService.ResetPassword(model.Email, model.NewPassword, model.Link));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
