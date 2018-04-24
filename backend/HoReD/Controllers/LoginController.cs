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
    public class LoginController : ApiController
    {
        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

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
    }
}
