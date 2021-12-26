using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace BookWriter.Services.Helper.AppValidation.HelperValidation
{
    public class BoolValidation
    {
        public static bool IsValidName(string name)
        {
            return name.All(Char.IsLetter);
        }  
        public static bool IsValidLink(string link)
        {
            bool str = link.StartsWith("http");
            return str;
        }
    }
}
