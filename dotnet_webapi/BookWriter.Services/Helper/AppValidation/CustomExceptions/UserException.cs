using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation.CustomExceptions
{
    public class UserException : Exception
    {
        public UserException() { }
        public UserException(string username):base($"Username {username} already exist!") { }
        
        
    }
}
