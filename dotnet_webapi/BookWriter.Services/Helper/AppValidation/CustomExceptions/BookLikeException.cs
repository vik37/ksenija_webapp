using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation.CustomExceptions
{
    public class BookLikeException : Exception
    {
        public BookLikeException(string message) : base(message)
        { }       
    }
}
