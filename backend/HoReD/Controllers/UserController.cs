using Entities.Services;
using HoReD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using HoReD.AuthFilters;
using System.Web;

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
        [TokenAuthenticate(Role = "patient")]
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
        [TokenAuthenticate(Role = "patient,doctor,admin")]
        [Route("GetUserInfoById/{UserInfoId}")]
        public IHttpActionResult GetUserInfoById(int UserInfoId)
        {
            return Ok(_userService.GetUserInfoById(UserInfoId));
        }

        /// <summary>
        /// Gets info about role-doctor,user or admin
        /// </summary>
        /// <param name="numberPage">Number of page</param>
        /// <param name="countInPage">Users count in page</param>
        /// <returns>List of users-first and lastname,isAdmin,profession</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("GetInfoAboutAllUsers/{numberPage}/{countInPage}")]
        public IHttpActionResult GetInfoAboutAllUsers(int numberPage, int countInPage)
        {
            return Ok(_userService.GetAllUsers(numberPage,countInPage));
        }
        /// <summary>
        /// Get filtered info about users first and lastname,isAdmin,profession
        /// </summary>
        /// <param name="numberPage">Number of page</param>
        /// <param name="countInPage">Users count in page</param>
        /// <param name="isAdmin">isAdmin</param>
        /// <param name="isDoctor">isDoctor</param>
        /// <param name="firstOrlastname">firstOrlastname(unnecessary param)</param>
        /// <returns>List of filtered info about users-first and lastname,isAdmin,profession</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("FilterAllUsers/{numberPage}/{countInPage}/{isAdmin}/{isDoctor}")]
        [Route("FilterAllUsers/{numberPage}/{countInPage}/{isAdmin}/{isDoctor}/{firstOrlastname}")]
        public IHttpActionResult FilterAllUsers(int numberPage, int countInPage,bool isAdmin, bool isDoctor, string firstOrlastname=null)
        {
            if (firstOrlastname != null) firstOrlastname=HttpUtility.UrlDecode(firstOrlastname.Replace(" ", ""));
            return Ok(_userService.FilteringUsers(numberPage, countInPage, isAdmin, isDoctor, firstOrlastname));
            }
        /// <summary>
        /// Count of pages for different quantity of users on the page
        /// </summary>
        /// <param name="countInPage">Users count in page</param>
        /// <returns>Count of pages(for pagination)</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("NumbersOfPage/{countInPage}")]
        public IHttpActionResult NumbersOfPage(int countInPage)
        {
            return Ok(_userService.GetPaginationCount(countInPage));
        }
        /// <summary>
        /// Current role of user
        /// </summary>
        /// <param name="idUser">idUser</param>
        /// <returns>List firsname,lastname,rolename </returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("GetUserRole/{idUser}")]
        public IHttpActionResult GetUserRole(int idUser)
        {
            return Ok(_userService.GetUserRole(idUser));
        }
        /// <summary>
        /// Available role for user
        /// </summary>
        /// <param name="idUser">idUser</param>
        /// <returns>List idRole,rolename</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("GetUserAvailableRole/{idUser}")]
        public IHttpActionResult GetUserAvailableRole(int idUser)
        {
            return Ok(_userService.GetUserAvailableRole(idUser));
        }
        /// <summary>
        /// Count of pages for different quantity of users on the page
        /// </summary>
        /// <param name="countInPage">User's count in page</param>
        /// <param name="isAdmin">isAdmin</param>
        /// <param name="isDoctor">isDoctor</param>
        /// <param name="firstOrlastname">firstOrlastname(unnecessary param)</param>
        /// <returns>Count of pages(for pagination)</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("NumbersOfPageFiltered/{countInPage}/{isAdmin}/{isDoctor}")]
        [Route("NumbersOfPageFiltered/{countInPage}/{isAdmin}/{isDoctor}/{firstOrlastname}")]
        public IHttpActionResult NumbersOfPageFiltered(int countInPage,bool isAdmin, bool isDoctor, string firstOrLastname=null)
        {
            return Ok(_userService.GetPaginationCountFiltered(countInPage,isAdmin,isDoctor,firstOrLastname));
        }

        /// <summary>
        /// Change of user role(from doctor to admin etc)
        /// </summary>
        /// <param name="currentUser">current User Id for logging info</param>
        /// <param name="userId">UserId</param>
        /// <param name="role">Role</param>
        /// <param name="idProffesion">idProffesion(unnecessary param)</param>
        /// <returns>Update role for one user</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("ChangeRole/{currentUser}/{userId}/{role}")]
        [Route("ChangeRole/{currentUser}/{userId}/{role}/{idProffesion}")]
        public IHttpActionResult ChangeRole(int currentUser, int userId, int role, int idProffesion = 0)

        {
            _userService.ChangeRole(currentUser, userId, role, idProffesion);
            return Ok();
        }
        /// <summary>
        /// List first and lastname of users for filtering
        /// </summary>
        /// <param name="text">text for searching</param>
        /// <returns>List first and lastnameof users</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("FirstLastname/{text}")]
        public IHttpActionResult ListFirstLastname(string text)
        {
            return Ok(_userService.FirstLastname(HttpUtility.UrlDecode(text.Replace(" ", ""))));
        }
    }
}
