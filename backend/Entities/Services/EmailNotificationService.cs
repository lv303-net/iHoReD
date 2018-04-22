using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Text;

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
        const string body = "To confirm your registration, please follow the link below";

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
            client.UseDefaultCredentials = false;

            return client;
        }

        public static void sendEmail(string email)
        {
            SmtpClient client = SetSmtpClient();
            MailMessage mm = new MailMessage(Credentials.Email, email, subject, body);

            client.Send(mm);
        }    
    }
}