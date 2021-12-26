using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation.CustomExceptions
{
    public class LoginException : Exception
    {
        public LoginException(string message): base(message) { }
    }
}
