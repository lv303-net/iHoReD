using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace Entities.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMembershipProvider _membershipProvider;
        private readonly IRSAKeyProvider _rsaProvider;

        public AuthService(IMembershipProvider membershipProvider, IRSAKeyProvider rsaProvider)
        {
            _membershipProvider = membershipProvider;
            _rsaProvider = rsaProvider;
        }

        public string GenerateJwtTokenAsync(string userEmail, string password)
        {
            if (!String.IsNullOrEmpty(password))
            {
                if (!_membershipProvider.VerifyUserPassword(userEmail, password))
                    return "Wrong access";
            }

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
