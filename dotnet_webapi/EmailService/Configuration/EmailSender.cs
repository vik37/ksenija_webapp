using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace EmailService.Configuration
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;
        public EmailSender(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }
        public void SendEmail(Message message, string currentLanguage)
        {
            var emailMessage = CreateEmailMessage(message, currentLanguage);

            Send(emailMessage);
        }
        private MimeMessage CreateEmailMessage(Message message, string currentLanguage)
        {
            var internationalLanguageMessages = InternationalLanguageMessages(currentLanguage);
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            { Text = String.Format("<p>{0}</p><br /><h2 style='font-size:12px'>{1}</h2><br /><p style='font-size:10px'>{2}</p>",             
            internationalLanguageMessages[0], message.Content, internationalLanguageMessages[1]) };

            return emailMessage;

        }
        private List<string> InternationalLanguageMessages(string currentLanguage)
        {
            List<string> internationalLanguageMessages = new List<string>();
            if (currentLanguage == "mkd")
            {
                internationalLanguageMessages.Add("Ве молиме отворете го линкот за промена на вашата лозинка");
                internationalLanguageMessages.Add("не одговарајте на оваа е-пошта");
            }
            else
            {
                internationalLanguageMessages.Add("Please open this Link to change your password");
                internationalLanguageMessages.Add("don't reply on this email");
            }
            return internationalLanguageMessages;
        }

        private void Send(MimeMessage mailMessage)
        {
            using(var client = new SmtpClient())
            {
                try
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, SecureSocketOptions.Auto);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.Username, _emailConfig.Password);
                    client.Send(mailMessage);
                }
                catch (Exception ex)
                {

                    throw new Exception(ex.Message);
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
