using Entities.Services;
using HoReD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;

namespace HoReD.Controllers
{
    /// <summary>
    /// Manages general User data
    /// </summary>
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Edits record in database with general info
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("EditUserInfo")]
        public IHttpActionResult EditUserInfo(UserInfoBindingModel model)
        {
            _userService.ApdateInfoAboutUser(model.Id, model.FirstName, model.LastName, model.Email, model.Password, model.IsActivated, model.Phone, model.Sex, model.Country, model.City, model.Street, model.Apartment);
            return Ok();
        }

        /// <summary>
        /// Gets all general info about user
        /// </summary>
        /// <param name="UserInfoId">ID of needed user</param>
        /// <returns>UserInfo</returns>
        [HttpGet]
        [Route("GetUserInfoById/{UserInfoId}")]
        public IHttpActionResult GetUserInfoById(int UserInfoId)
        {
            return Ok(_userService.GetUserInfoById(UserInfoId));
        }

        [HttpGet]
        [Route("GetInfoAboutAllUsers/{numberPage}/{countInPage}")]
        public IHttpActionResult GetInfoAboutAllUsers(int numberPage, int countInPage)
        {
            return Ok(_userService.GetAllUsers(numberPage,countInPage));
        }
        [HttpGet]
        [Route("FiterAllUsers/{numberPage}/{countInPage}/{isAdmin}/{isDoctor}")]
        [Route("FiterAllUsers/{numberPage}/{countInPage}/{isAdmin}/{isDoctor}/{firstOrlastname}")]
        public IHttpActionResult FiterAllUsers(int numberPage, int countInPage,bool isAdmin, bool isDoctor, string firstOrlastname=null)
        {
            return Ok(_userService.FiteringUsers(numberPage, countInPage,isAdmin,isDoctor,firstOrlastname));
        }

        [HttpGet]
        [Route("NumbersOfPage/{countInPage}")]
        public IHttpActionResult NumbersOfPage(int countInPage)
        {
            return Ok(_userService.GetPaginationCount(countInPage));
        }

    }
}
