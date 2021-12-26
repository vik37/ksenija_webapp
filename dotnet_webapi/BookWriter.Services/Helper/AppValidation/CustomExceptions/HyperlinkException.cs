using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation.CustomExceptions
{
    public class HyperlinkException : Exception
    {
        public HyperlinkException(string message)
            : base(message) { }        
    }
}
