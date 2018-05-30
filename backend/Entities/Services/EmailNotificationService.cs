using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Text;
using System.Configuration;

namespace Entities.Services
{
    public static class EmailNotificationService
    {
        /// <summary>
        ///	Port for SmtpClient.
        /// </summary>
        const int SmtpClientPort = 587;

        /// <summary>
        ///	Host for SmtpClient.
        /// </summary>
        const string SmtpClientHost = "smtp.gmail.com";

        const string subjectActivate = "Hospital Registaration Desk";
        const string bodyActivate = "To activate in HoReD go to the link";

        const string subjectResetPassword = "Resetting password in Hospital Registaration Desk";
        const string bodyResetPassword = "To change password follow the  ";

        /// <summary>
        ///	Credentials that are used for sending emails.
        /// </summary>
        internal static class Credentials
        {
            public const string Email = "hospital.lv303@gmail.com";
            public const string Password = "Lv-303.Net";
        }

        static SmtpClient SetSmtpClient()
        {
            SmtpClient client = new SmtpClient();

            client.Port = SmtpClientPort;
            client.Host = SmtpClientHost;
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Credentials = new System.Net.NetworkCredential(Credentials.Email, Credentials.Password);
                     
            return client;
        }

        public static void sendEmail(User user)
        {       
           string userId = user.Id.ToString();
            string encryptedUserId = EncryptionService.Encrypt(userId);
            SmtpClient client = SetSmtpClient();
            MailMessage mailMessage = new MailMessage(Credentials.Email, user.Email);
            mailMessage.IsBodyHtml = true;
            mailMessage.Subject = subjectActivate;
            mailMessage.Body = bodyActivate + "<a href="+ConfigurationManager.AppSettings["Linkpath"] + "/activation/"+ encryptedUserId+">"+" "+ "click here</a>";
            client.Send(mailMessage);
        }

        public static void sendEmailToResetPassword(string email, string token)
        {
            SmtpClient client = SetSmtpClient();
            MailMessage mailMessage = new MailMessage(Credentials.Email, email);
            mailMessage.IsBodyHtml = true;
            mailMessage.Subject = subjectResetPassword;
            mailMessage.Body = bodyResetPassword + "<a href=" + ConfigurationManager.AppSettings["Linkpath"] + "/resetPassword/" + token + ">" + " " + "link</a>";
            client.Send(mailMessage);
        }
    }
}