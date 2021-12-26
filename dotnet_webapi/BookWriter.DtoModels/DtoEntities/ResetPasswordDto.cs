using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class ResetPasswordDto
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
