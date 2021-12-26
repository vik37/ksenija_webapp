using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation.FileValidation
{
    public class ImageValidation
    {
        public static bool CheckExtension(string extension)
        {
            switch (extension)
            {
                case "jpg":
                    return true;
                case "jpeg":
                    return true;
                case "png":
                    return true;
                default:
                    return false;

            }
        }
    }
}
