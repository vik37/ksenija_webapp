using AutoMapper;
using BookWriter.DataAccess.Interfaces;
using BookWriter.Domain.DomainModels;
using BookWriter.Domain.Enum;
using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookWriter.Services.Services
{
    public class BookService : IBookService
    {
        private readonly IRepository<Book> _bookRepo;
        private readonly IRepository<Hyperlink> _hpLinksRepo;
        private readonly IMapper _mapper;
        private readonly IRepository<BookComment> _bookCommentRepo;
        public BookService(IRepository<Book> bookRepo, IMapper mapper, 
            IRepository<Hyperlink> hpLinksRepo, IRepository<BookComment> bookCommentRepo) 
        {
            _bookRepo = bookRepo;
            _mapper = mapper;
            _hpLinksRepo = hpLinksRepo;
            _bookCommentRepo = bookCommentRepo;
        }          

        public IEnumerable<BookDto> GetAll()
        {
            var books = _bookRepo.GetAll().ToList();
            return _mapper.Map<List<Book>, List<BookDto>>(books);
        }
        public BookDto GetById(int id)
        {
            try
            {
                var book = _bookRepo.GetById(id);
                if (book == null)
                {
                    throw new InvalidOperationException("Book does not exist");
                }             
                return _mapper.Map<BookDto>(book);
            }
            catch(InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }           
        }
        
        public int AddBook(BookDto model)
        {
            try
            {
                var bookMap = _mapper.Map<Book>(model);
                return _bookRepo.Insert(bookMap);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public int Update(int id,BookDto model)
        {
            try
            {
                var book = _bookRepo.GetById(id);
                if (book == null)
                {
                    throw new InvalidOperationException($"This book does not exist");
                }
                else
                {
                    book.Name = model.Name;
                    book.Description = model.Description;
                    book.DateOfPublish = model.DateOfPublish;
                    book.Publisher = model.Publisher;
                    book.Genre1 = (Genre)model.Genre1;
                    book.Genre2 = (Genre)model.Genre2;
                    book.Genre3 = (Genre)model.Genre3;
                    book.Genre4 = (Genre)model.Genre4;
                    book.Pages = model.Pages;
                    book.Market = (Market)model.Market;
                    book.Country = model.Country;
                    book.Image = model.ImageName;
                    
                    return _bookRepo.Update(book);
                }
            }
            catch(InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public int Delete(int id)
        {
            try
            {
                var book = _bookRepo.GetById(id);
                
                if(book == null)
                {
                    throw new InvalidOperationException($"Book does not exist!");
                }
                else
                {
                    var hpLinks = _hpLinksRepo.GetAll().Where(hp => hp.BookId == book.Id).ToList();
                    foreach (var link in hpLinks)
                    {                       
                        _hpLinksRepo.Delete(link.Id);
                    }
                    var bookComments = _bookCommentRepo.GetAll().Where(bc => bc.BookId == book.Id).ToList();
                    foreach (var comment in bookComments)
                    {
                        _bookCommentRepo.Delete(comment.Id);
                    }
                   return _bookRepo.Delete(book.Id);                  
                }
            }
            catch(InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}
