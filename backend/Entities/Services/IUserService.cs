using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface IUserService
    {
        void StoringInfoAboutNewUser(string firstname, string lastname, string email, string password, string phone);
        User GetUserInfo(string email);
        void ApdateInfoAboutUser(string id, string firstname, string lastname, string email, string password, string isActivated,
            string phone, string sex, string country, string city, string street, string apartment);
        UserInfo GetUserInfoById(int id);
        void ActivateUser(int Id);
    }
}
