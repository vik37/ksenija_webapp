using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class ForgottenPasswordDto
    {
        public string Email { get; set; }
        public string ClientURI { get; set; }
        public string CurrentLanguage { get; set; }
    }
}
