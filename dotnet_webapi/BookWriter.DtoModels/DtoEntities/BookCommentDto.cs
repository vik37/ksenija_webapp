using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class BookCommentDto
    {
        public int Id { get; set; }
        [MaxLength(10000,ErrorMessage = "Maximum number of characters is 10000!")]
        public string BookComment { get; set; }
        public BookDto Book { get; set; }
        public UserDto User { get; set; }
    }
}
