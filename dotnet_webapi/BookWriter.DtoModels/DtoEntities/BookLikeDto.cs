using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class BookLikeDto
    {
        public int Id { get; set; }
        public bool Like { get; set; }
        public UserDto User { get; set; }
        public BookDto Book { get; set; }
    }
}
