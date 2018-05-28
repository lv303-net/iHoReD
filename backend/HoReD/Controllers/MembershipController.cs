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
        private readonly AuthService _authService;
        private readonly IUserService _userService;

        public MembershipController()
        {
            _userService = new UserService(new DbContext());
            _authService = new AuthService(new MembershipProvider(new UserService(new DbContext())),new RSAKeyProvider());
        }


        [AllowAnonymous]
        public IHttpActionResult Authenticate(LoginUserBindingModel loginInfo)
        {
            try
            {
                UserInfoWithToken userInfoWithToken = new UserInfoWithToken();
                userInfoWithToken.Token = _authService.GenerateJwtTokenAsync(loginInfo.Email, loginInfo.Password);
                userInfoWithToken.User = _userService.GetUserInfo(loginInfo.Email);
                return Ok(userInfoWithToken);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
            
        }
    }
}