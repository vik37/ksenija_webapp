using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation.CustomExceptions
{
    public class ImageException : Exception
    {
        public ImageException(string message)
            : base(message) { }        
    }
}
