using Entities.Services;
using HoReD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HoReD.Controllers
{
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("EditUserInfo")]
        public IHttpActionResult EditUserInfo(UserInfoBindingModel model)
        {
            _userService.ApdateInfoAboutUser(model.Id, model.FirstName, model.LastName, model.Email, model.Password, model.IsActivated, model.Phone, model.Sex, model.Country, model.City, model.Street, model.Apartment);
            return Ok();
        }

    }
}
