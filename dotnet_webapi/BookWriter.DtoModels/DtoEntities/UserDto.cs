using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public List<BookCommentDto> BookComments { get; set; }
        public List<ContactDto> Contact { get; set; }
        public List<BookLikeDto> BookLikes { get; set; }
    }
}
