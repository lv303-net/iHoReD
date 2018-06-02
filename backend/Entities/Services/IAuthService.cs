using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface IAuthService
    {
        string GenerateJwtTokenAsync(string userEmail, string password);
        bool ValidateTokenAsync(string TokenString);
        ClaimsPrincipal GetPrincipal(string token);
    }
}
