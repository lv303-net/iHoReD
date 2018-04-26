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


        const string subject = "Hospital Registaration Desk";
        const string body = "Congratulations,you are registered in HoReD";

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
<<<<<<< HEAD
        {
            string userId = user.Id.ToString();

            string encryptedUserId = EncryptionService.Encrypt(userId);
            
            SmtpClient client = SetSmtpClient();
            MailMessage mm = new MailMessage(Credentials.Email, user.Email);
            mm.IsBodyHtml = true;
            mm.Subject = subject;
            mm.Body = body + "<a href='http://localhost:3000/Registration/ActivateUser/" + encryptedUserId + "'>click here</a>";
            client.Send(mm);
=======
        {         
            SmtpClient client = SetSmtpClient();
            MailMessage mailmessage = new MailMessage(Credentials.Email, user.Email);
            mailmessage.IsBodyHtml = true;
            mailmessage.Subject = subject;
            mailmessage.Body = body + "<a href="+ConfigurationManager.AppSettings["Path"]+ "/activation/"+ user.Id+">click here</a>";
            client.Send(mailmessage);
>>>>>>> 67af52d167f0ebd481eb4d493b4622e44689622c
        }    
    }
}