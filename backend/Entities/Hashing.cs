using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace Entities
{
    /// <summary>
    /// Hashing class implementing some methods for hashing password
    /// </summary>

    public class Hashing
    {
        /// <summary>
        /// Method for generating salt which then will be used in hashing method
        /// </summary>
        /// <returns>Returns salt.</returns>
        /// 
        public static string GenerateSalt()
        {
            int workFactor = 12;
            return BCrypt.Net.BCrypt.GenerateSalt(workFactor);
        }

        /// <summary>
        /// Method for hashing password
        /// </summary>
        /// <param name="password">Password that needs to be hashed</param>
        /// <returns>Returns hashed password as string</returns>
        public static string HashingPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, GenerateSalt());
        }

        /// <summary>
        /// Method for verifying password
        /// </summary>
        /// <remarks>
        /// Checks if password is equal to the one already hashed
        /// </remarks>
        /// <param name="password">Password</param>
        /// <param name="hash">Already hashed password</param>
        /// <returns>
        /// Returns true (password and hash is equal) otherwise - false
        /// </returns>
        public static bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
