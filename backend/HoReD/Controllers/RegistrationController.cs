﻿using System;
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
                
                _userService.StoringInfoAboutNewUser(model.FirstName, model.LastName, model.Email, model.Password);

                EmailNotificationService.sendEmail(_userService.GetUserInfo(model.Email));
                return Ok();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("Registration/ActivateUser/{IdUser}")]
        public IHttpActionResult ActivateUser(int IdUser)
        {
            try
            {
                _userService.ActivateUser(IdUser);
                return this.Redirect("/");//redirect to user page
            }   
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}
