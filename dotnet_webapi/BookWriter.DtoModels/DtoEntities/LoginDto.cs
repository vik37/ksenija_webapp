using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
