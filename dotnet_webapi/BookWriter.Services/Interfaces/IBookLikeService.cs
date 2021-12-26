using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IBookLikeService
    {
        IEnumerable<BookLikeDto> GetAll(int bookId, string userId);
        BookLikeDto AddLike(string username, int bookId, BookLikeDto model);
        int UpdateLike(string username, int bookId, int id, BookLikeDto model);
    }
}
