using AutoMapper;
using BookWriter.DataAccess.Interfaces;
using BookWriter.Domain.DomainModels;
using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Helper.AppValidation.CustomExceptions;
using BookWriter.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookWriter.Services.Services
{
    public class BookLikeService : IBookLikeService
    {
        private readonly IRepository<BookLike> _bookLikeRepo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        private readonly IRepository<Book> _bookRepo;
        public BookLikeService(IRepository<BookLike> bookLikeRepo, IMapper mapper,
                               IUserRepository userRepo, IRepository<Book> bookRepo)
        {
            _bookLikeRepo = bookLikeRepo;
            _mapper = mapper;
            _userRepo = userRepo;
            _bookRepo = bookRepo;
        }

        public IEnumerable<BookLikeDto> GetAll(int bookId, string username)
        {
            try
            {
                var user = _userRepo.GetByUsername(username);
                if(user == null)
                {
                    throw new InvalidOperationException("User does not exist");
                }
                var book = _bookRepo.GetById(bookId);    
                if(book == null)
                {
                    throw new InvalidOperationException("Book does not exist");
                }
                var bookLikes = _bookLikeRepo.GetAll().Where(x => x.BookId == bookId).ToList();
                return _mapper.Map<IEnumerable<BookLike>, IEnumerable<BookLikeDto>>(bookLikes);
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
        public BookLikeDto AddLike(string username, int bookId, BookLikeDto model)
        {
            try
            {
                var user = _userRepo.GetByUsername(username);
                if (user == null)
                {
                    throw new InvalidOperationException("User or book does not exist!");
                }
                var book = _bookRepo.GetById(bookId);
                if (book == null)
                {
                    throw new InvalidOperationException("User or book does not exist!");
                }
                var bookLikes = _bookLikeRepo.GetAll()
                                                .Where(x => x.UserId == user.Id && x.BookId == book.Id)
                                                .FirstOrDefault();
                if(bookLikes != null)
                {
                    throw new BookLikeException("Like alredy exist");
                }                                            
                else
                {
                    var like = new BookLike
                    {
                        Like = model.Like,
                        UserId = user.Id,
                        BookId = book.Id
                    };
                     _bookLikeRepo.Insert(like);
                    var newBookLike = _bookLikeRepo.GetAll()
                                                    .Where(x => x.UserId == user.Id && x.BookId == book.Id)
                                                    .FirstOrDefault();
                    return _mapper.Map<BookLikeDto>(newBookLike);
                }
            }
            catch(BookLikeException ex)
            {
                throw new BookLikeException(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public int UpdateLike(string username, int bookId, int id, BookLikeDto model)
        {
            try
            {
                var bookLike = _bookLikeRepo.GetById(id);
                if (bookLike == null)
                {
                    throw new InvalidOperationException("This book does not exist!");
                }
                var user = _userRepo.GetByUsername(username);
                var book = _bookRepo.GetById(bookId);
                if(user == null || book == null)
                {
                    throw new InvalidOperationException("Book or User does not exist");
                }
                if (bookLike.BookId != book.Id || bookLike.UserId != user.Id)
                {
                    throw new BookLikeException("Book does not match with user");
                }
                bookLike.Like = model.Like;
                return _bookLikeRepo.Update(bookLike);
            }
            catch(BookLikeException ex)
            {
                throw new BookLikeException(ex.Message);
            }
            catch (InvalidOperationException ex)
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
