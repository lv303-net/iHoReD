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

        [AllowAnonymous]
        [Route("ResetPassword")]
        public IHttpActionResult ResetPassword(LoginUserBindingModel loginInfo)
        {
            try
            {
                UserInfoWithToken userInfoWithToken = new UserInfoWithToken();
                userInfoWithToken.Token = _authService.GenerateJwtTokenAsync(loginInfo.Email, null);
                EmailNotificationService.sendEmailToResetPassword(loginInfo.Email, userInfoWithToken.Token);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [AllowAnonymous]
        [Route("TokensMatch")]
        public IHttpActionResult TokensMatch(UserWithTokenBindingModel model)
        {
            try
            {
                UserInfoWithToken userInfoWithToken = new UserInfoWithToken();
                userInfoWithToken.Token = _authService.GenerateJwtTokenAsync(model.Email, null);
                return userInfoWithToken.Token == model.Token ? Ok(true) : Ok(false);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}