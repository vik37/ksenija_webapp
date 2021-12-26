using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IBookCommentService
    {
        IEnumerable<BookCommentDto> GetAll(string username, int bookId);
        BookCommentDto AddComment(string username, int bookId, BookCommentDto model);
        int RemoveComment(string username, int bookId, int id);
    }
}
