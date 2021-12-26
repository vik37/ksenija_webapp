using AutoMapper;
using BookWriter.DataAccess.Interfaces;
using BookWriter.DataAccess.Repositories;
using BookWriter.Domain.DomainModels;
using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Helper.AppValidation.CustomExceptions;
using BookWriter.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookWriter.Services.Services
{
    public class BookCommentService : IBookCommentService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<BookComment> _bookCommentRepo;
        private readonly IUserRepository _userRepo;
        private readonly IRepository<Book> _bookRepo;
        public BookCommentService(IMapper mapper,
                                  IRepository<BookComment> bookCommentRepo,
                                  IUserRepository userRepo,
                                  IRepository<Book> bookRepo)
        {
            _mapper = mapper;
            _bookCommentRepo = bookCommentRepo;
            _userRepo = userRepo;
            _bookRepo = bookRepo;
        }
        public IEnumerable<BookCommentDto> GetAll(string username, int bookId)
        {
            try
            {
                var user = _userRepo.GetByUsername(username);
                if (user == null)
                {
                    throw new InvalidOperationException("User does not exist!");
                }                   
                var book = _bookRepo.GetById(bookId);
                if (book == null)
                {
                    throw new InvalidOperationException("Book does not exist!");
                }                   
                var bookComment = _bookCommentRepo.GetAll().Where(bc => bc.BookId == book.Id || bc.UserId == user.Id).ToList();
                var mappedComments = _mapper.Map<List<BookComment>, List<BookCommentDto>>(bookComment);
                return mappedComments;
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

        public BookCommentDto AddComment(string username, int bookId, BookCommentDto model)
        {
            try
            {
                var user = _userRepo.GetByUsername(username);
                var book = _bookRepo.GetById(bookId);
                if (user == null || book == null)
                    throw new InvalidOperationException("User or book does not exist!");
      
                var comment = new BookComment
                {
                    Comment = model.BookComment,
                    BookId = book.Id,
                    UserId = user.Id,
                    Book = book,
                    User = user
                };
               _bookCommentRepo.Insert(comment);
                var bookComment = _bookCommentRepo.GetAll()
                                                    .Where(x => x.BookId == book.Id && x.UserId == user.Id)
                                                    .LastOrDefault(x => x.Comment == comment.Comment);
                if(bookComment == null)
                {
                    throw new InvalidOperationException("Book comment does not exist!");
                }
                var bkCommentDto = new BookCommentDto
                {
                    Id = bookComment.Id,
                    BookComment = bookComment.Comment,
                    User = new UserDto
                    {
                        Id = bookComment.User.Id,
                        Firstname = bookComment.User.Firstname,
                        Lastname = bookComment.User.Lastname,
                        Username = bookComment.User.UserName
                    },
                    Book = new BookDto()
                };
                return bkCommentDto;
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
        public int RemoveComment(string username, int bookId, int id)
        {
            try
            {
                var bookComment = _bookCommentRepo.GetById(id);
                if (bookComment == null)
                {
                    throw new InvalidOperationException("This article does not exist!");
                }
                var user = _userRepo.GetByUsername(username);
                var book = _bookRepo.GetById(bookId);
                if(bookComment.BookId != book.Id || bookComment.UserId != user.Id)
                {
                    throw new Exception("Book does not match with user");
                }
                return _bookCommentRepo.Delete(bookComment.Id);
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
