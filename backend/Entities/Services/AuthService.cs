using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace Entities.Services
{
    public class AuthService
    {
        private readonly MembershipProvider _membershipProvider;
        private readonly RSAKeyProvider _rsaProvider;

        public AuthService(MembershipProvider membershipProvider, RSAKeyProvider rsaProvider)
        {
            _membershipProvider = membershipProvider;
            _rsaProvider = rsaProvider;
        }

        //public static string GenerateToken(string username,string role, int expireMinutes = 20)
        //{
        //    var symmetricKey = Convert.FromBase64String(Secret);
        //    var tokenHandler = new JwtSecurityTokenHandler();

        //    var now = DateTime.UtcNow;
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[]
        //                {
        //                new Claim(ClaimTypes.Name, username),
        //                new Claim(ClaimTypes.Role,role)
        //            }),

        //        Expires = now.AddMinutes(Convert.ToInt32(expireMinutes)),

        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var stoken = tokenHandler.CreateToken(tokenDescriptor);
        //    var token = tokenHandler.WriteToken(stoken);

        //    return token;
        //}

        public string GenerateJwtTokenAsync(string userEmail, string password)
        {
            if (!_membershipProvider.VerifyUserPassword(userEmail, password))
                return "Wrong access";

            List<Claim> claims = _membershipProvider.GetUserClaims(userEmail);

            string publicAndPrivateKey = _rsaProvider.GetPrivateAndPublicKeyAsync();
            if (publicAndPrivateKey == null)
                return "RSA key error";

            RSACryptoServiceProvider publicAndPrivate = new RSACryptoServiceProvider();
            publicAndPrivate.FromXmlString(publicAndPrivateKey);

            JwtSecurityToken jwtToken = new JwtSecurityToken
            (
                issuer: "Any",
                audience: "Any",
                claims: claims,
                signingCredentials: new SigningCredentials(new RsaSecurityKey(publicAndPrivate), SecurityAlgorithms.RsaSha256Signature),
                expires: DateTime.Now.AddDays(30)
            );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            string tokenString = tokenHandler.WriteToken(jwtToken);

            return tokenString;
        }

        public bool ValidateTokenAsync(string TokenString)
        {
            Boolean result = false;

            try
            {
                SecurityToken securityToken = new JwtSecurityToken(TokenString);
                JwtSecurityTokenHandler securityTokenHandler = new JwtSecurityTokenHandler();
                RSACryptoServiceProvider publicAndPrivate = new RSACryptoServiceProvider();

                string publicAndPrivateKey =  _rsaProvider.GetPrivateAndPublicKeyAsync();
                if (publicAndPrivateKey == null)
                    return result;

                publicAndPrivate.FromXmlString(publicAndPrivateKey);

                TokenValidationParameters validationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = "Any",
                    ValidAudience = "Any",
                    IssuerSigningKey = new RsaSecurityKey(publicAndPrivate)
                };

                ClaimsPrincipal claimsPrincipal = securityTokenHandler.ValidateToken(TokenString, validationParameters, out securityToken);

                result = true;
            }
            catch (Exception ex)
            {
                result = false;
            }

            return result;
        }

        public ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;
                string publicAndPrivateKey = _rsaProvider.GetPrivateAndPublicKeyAsync();
                RSACryptoServiceProvider publicAndPrivate = new RSACryptoServiceProvider();
                publicAndPrivate.FromXmlString(publicAndPrivateKey);

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new RsaSecurityKey(publicAndPrivate)
                };

                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

                return principal;
            }

            catch (Exception)
            {
                return null;
            }
        }

    }
}
