using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Entities.Services;
using HoReD.Models;

namespace HoReD.Controllers
{
    public class MembershipController : ApiController
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public MembershipController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        /// <summary>
        /// Verify user data
        /// </summary>
        /// <param name="loginInfo">Gets user email and password</param>
        /// <returns>If data correct - 200 status code which contain access token, else returns 401 status code</returns>
        [AllowAnonymous]
        public IHttpActionResult Authenticate(LoginUserBindingModel loginInfo)
        {
            try
            {
                UserInfoWithToken userInfoWithToken = new UserInfoWithToken();
                userInfoWithToken.Token = _authService.GenerateJwtTokenAsync(loginInfo.Email, loginInfo.Password);
                if (userInfoWithToken.Token.Split('.').Length == 3)
                {
                    userInfoWithToken.User = _userService.GetUserInfo(loginInfo.Email);
                    return Ok(userInfoWithToken);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception e)
            {
                return Unauthorized();
            }

        }
    }
}