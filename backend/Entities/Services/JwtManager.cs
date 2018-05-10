using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace Entities.Services
{
    public static class JwtManager
    {
        private const string Secret = "glg2,vfqw/cd=dslgmtz]as1'c,f8dbierna/to.a";

        public static string GenerateToken(string email)
        {
            var symetricKey = Convert.FromBase64String(Secret);

            var tokenHandler = new JwtSecurityTokenHandler();

            var datetimeNow = DateTime.UtcNow;

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {new Claim(ClaimTypes.Email, email)}),
                Expires = datetimeNow.AddMinutes(1),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(symetricKey), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescription));

            return token;
        }
    }
}
