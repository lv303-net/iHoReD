using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class UserService : IUserService
    {
        private readonly IDbContext _dbContext;

        public UserService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void StoringInfoAboutNewUser(string firstname, string lastname, string email, string password)
        {
            var password_hash = Hashing.HashingPassword(password);

            var regInfo = new Dictionary<string, object>()
            {
                { "FIRSTNAME", firstname},
                { "LASTNAME", lastname},
                { "EMAIL", email},
                { "PASSWORD", password_hash},
            };
            var cmd = "REGISTER_USER";

            _dbContext.ExecuteSqlQuery(cmd, regInfo);
        }

        public User GetUserInfo(string email)
        {
            const string cmd = "GET_USER_INFO_START_PAGE";
            var param = new Dictionary<string, object>()
            {
                {"EMAIL", email},
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var user = new User
                {
                    Id = Convert.ToInt32(values.GetValue(0)),
                    FirstName = values.GetValue(1).ToString(),
                    LastName = values.GetValue(2).ToString(),
                    RoleName = values.GetValue(3).ToString(),
                    Password = values.GetValue(4).ToString(),
                    Email = values.GetValue(5).ToString(),
                };

            return user;
        }

        public void ApdateInfoAboutUser(string id,string firstname, string lastname, string email, string password, string isActivated,
            string phone, string sex, string country, string city, string street, string apartment)
        {
            var regInfo = new Dictionary<string, object>()
            {
                { "@ID", int.Parse(id)},
                { "@PHONE", phone},
                { "@SEX", bool.Parse(sex)},
                { "@COUNTRY", country},
                { "@CITY", city},
                { "@STREET", street},
                { "@APARTMENT", apartment},
                { "@FIRSTNAME", firstname},
                { "@LASTNAME", lastname},
                { "@EMAIL", email},
            };
            var cmd = "EDIT_USER_INFO";

            _dbContext.ExecuteSqlQuery(cmd, regInfo);
        }

        public UserInfo GetUserInfoById(int id)
        {
            const string cmd = "GET_ALL_USER_INFO";
            var param = new Dictionary<string, object>()
            {
                {"@ID", id},
            };
            var str = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = str.Split('*');
            var userInfo = new UserInfo
            {
                Id = Convert.ToInt32(values.GetValue(0)),
                FirstName = values.GetValue(1).ToString(),
                LastName = values.GetValue(2).ToString(),
                Password = values.GetValue(3).ToString(),
                Email = values.GetValue(4).ToString(),
                Phone = values.GetValue(5).ToString(),
                Sex= bool.Parse(values.GetValue(6).ToString()),
                Country = values.GetValue(7).ToString(),
                City= values.GetValue(8).ToString(),
                Street= values.GetValue(9).ToString(),
                Apartment= values.GetValue(10).ToString()
            };

            return userInfo;
        }
    }
}
