using System;
using System.Collections.Generic;
using System.Text;

namespace EmailService.Configuration
{
    public interface IEmailSender
    {
        void SendEmail(Message message,string currentLanguage);
    }
}
