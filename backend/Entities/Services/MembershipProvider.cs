using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;

namespace Entities.Services
{
    /// <summary>
    /// </summary>
    public class MembershipProvider : IMembershipProvider
    {
        private readonly IUserService _userService;

        public MembershipProvider(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public List<Claim> GetUserClaims(string email)
        {
            var currentUser = _userService.GetUserInfo(email);
            return new List<Claim>
            {
                new Claim(ClaimTypes.Role, currentUser.RoleName),
                new Claim(ClaimTypes.Email, currentUser.Email)
            }; ;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool VerifyUserPassword(string email, string password)
            => Hashing.VerifyPassword(password, _userService.GetUserInfo(email).Password);
    }
}
