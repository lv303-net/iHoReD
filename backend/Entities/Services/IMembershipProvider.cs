using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    /// <summary>
    /// 
    /// </summary>
    public interface IMembershipProvider
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        List<Claim> GetUserClaims(string username);
    }
}
