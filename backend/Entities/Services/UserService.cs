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

        public void StoringInfoAboutNewUser(string firstname, string lastname, string email, string password, string phone)
        {
            var passwordHash = Hashing.HashingPassword(password);

            var regInfo = new Dictionary<string, object>()
            {
                { "FIRSTNAME", firstname},
                { "LASTNAME", lastname},
                { "EMAIL", email},
                { "PASSWORD", passwordHash},
                { "PHONE", phone}
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

        public int ActivateUser(int Id)
        {
            const string cmd = "ACTIVATE_USER";
            string outparam = "@IS_RESULT";
            var param = new Dictionary<string, object>()
            {
                {"ID_USER", Id},
            };

            int outval = _dbContext.ExecuteSqlQuery(cmd, outparam, param);
            return outval;
        }

        public void ApdateInfoAboutUser(string id, string firstname, string lastname, string email, string password, string isActivated,
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
                Sex = (values.GetValue(6).ToString() == "") ? false : Convert.ToBoolean(values.GetValue(6).ToString()),
                Country = values.GetValue(7).ToString(),
                City = values.GetValue(8).ToString(),
                Street = values.GetValue(9).ToString(),
                Apartment = values.GetValue(10).ToString()
            };

            return userInfo;
        }

        public List<UserRole> GetAllUsers(int numberPage, int countInPage)
        {
            const string cmd = "GET_ALL_USERS";
            var param = new Dictionary<string, object>()
            {
                {"@PAGENUMBER", numberPage},
                {"@COUNTINPAGE", countInPage},
            };

            var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = data.Split('*');
            var users = Utils.ParseSqlQuery.GetAllUsers(data);
            return users;
        }

        public List<UserRole> FilteringUsers(int numberPage, int countInPage, bool isAdmin, bool isDoctor, string firstOrlastname = null)
        {
            const string cmd = "FILTERING_USERS";
            var param = new Dictionary<string, object>()
            {
                {"@PAGENUMBER", numberPage},
                {"@COUNTINPAGE", countInPage},
                {"@FIRSTORLASTNAME", firstOrlastname},
                {"@ISADMIN", isAdmin},
                {"@ISADOCTOR",isDoctor }
            };

            var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = data.Split('*');
            var users = Utils.ParseSqlQuery.GetAllUsers(data);
            return users;
        }
        public int GetPaginationCount(int countInPage)
        {
            const string cmd = "GET_PAGINATION_COUNT";
            string outparam = "@PAGINATION";
            var param = new Dictionary<string, object>()
            {
                {"@COUNTINPAGE", countInPage }
            };
            int outval = _dbContext.ExecuteSqlQuery(cmd, outparam, param);
            return outval;
        }

        public int GetPaginationCountFiltered(int countInPage, bool isAdmin, bool isDoctor, string firstOrLastname = null)
        {
            const string cmd = "GET_PAGINATION_COUNT_FILTERED";
            string outparam = "@PAGINATION";
            var param = new Dictionary<string, object>()
            {
                {"@COUNTINPAGE", countInPage },
                {"@ISADMIN",isAdmin },
                {"@ISADOCTOR",isDoctor },
                {"@FIRSTORLASTNAME",firstOrLastname }
            };
            int outval = _dbContext.ExecuteSqlQuery(cmd, outparam, param);
            return outval;
        }

        public UserRole GetUserRole(int idUser)
        {
            const string cmd = "GET_USER_ROLE";
            var param = new Dictionary<string, object>()
            {
                {"IDUsers", idUser},
            };

            var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = data.Split('*');
            var users = Utils.ParseSqlQuery.GetUserRole(data);
            return users;
        }

        public List<Role> GetUserAvailableRole(int idUser)
        {
            const string cmd = "GET_USER_AVAILABLE_ROLE";
            var param = new Dictionary<string, object>()
            {
                {"IDUsers", idUser},
            };

            var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = data.Split('*');
            var users = Utils.ParseSqlQuery.GetUserAvailableRole(data);
            return users;
        }

        public void ChangeRole(int userId, int role, int idProfession = 0)
        {
            const string cmd = "CHANGE_ROLE";
           
            var param = new Dictionary<string, object>()
            {
                {"ID_USER", userId},
                {"ROLE", role},
                {"ID_PROFESSION", idProfession},
            };

            _dbContext.ExecuteSqlQuery(cmd,'*', param);
           
        }
        public List<UserFirstLastname> FirstLastname(string text)
        {
            const string cmd = "LIST_USER_FOR_ROLE";

            var param = new Dictionary<string, object>()
            {
                {"@SEARCHTEXT", text},

            };
            var data = _dbContext.ExecuteSqlQuery(cmd, '*', param);
            var values = data.Split('*');
            var users = Utils.ParseSqlQuery.GetAllUsersFirstLastname(data);
            return users;
           
        }
    }
}
