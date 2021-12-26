using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public UserDto User { get; set; }
    }
}
