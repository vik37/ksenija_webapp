using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IBookService
    {
        IEnumerable<BookDto> GetAll();
        BookDto GetById(int id);       
        int AddBook(BookDto model);
        int Update(int id,BookDto model);
        int Delete(int id);
       
    }
}
