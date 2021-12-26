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
    public class HyperLinkService : IHyperLinkService
    {
        private readonly IRepository<Hyperlink> _hpLinkRepo;
        private readonly IRepository<Book> _bookRepo;
        public HyperLinkService(IRepository<Hyperlink> hpLinkRepo, IRepository<Book> bookRepo)
        {
            _hpLinkRepo = hpLinkRepo;
            _bookRepo = bookRepo;
        }
        
        public IEnumerable<HyperlinkDto> GetAll(int bookId)
        {
            try
            {
                var links = _hpLinkRepo.GetAll().Where(x => x.BookId == bookId).ToList();
                var models = MappedLink(links);
                return models;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }                       
        }
        private static List<HyperlinkDto> MappedLink(List<Hyperlink> links)
        {
            return links.Select(l => new HyperlinkDto
            {
                Id = l.Id,
                Name = l.Name,
                Link = l.Link,
                BookId = l.BookId
            }).ToList();
        } 

        public int RemoveHpLink(int bookId, int hpLinkId)
        {
            try
            {
                var book = _bookRepo.GetById(bookId);
                var hpLink = _hpLinkRepo.GetById(hpLinkId);
                if(book == null || hpLink == null)
                {
                    throw new InvalidOperationException("Book or Link does not exist!");
                }
                else
                {
                    if (hpLink.BookId != book.Id)
                    {
                        throw new HyperlinkException($"Hyperlink {hpLink.Name} does not belong to book {book.Name} ");
                    }
                   return  _hpLinkRepo.Delete(hpLink.Id);
                }
            }
            catch(HyperlinkException ex)
            {
                throw new HyperlinkException(ex.Message);
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
        public int AddNewHpInBook(int bookId, HyperlinkDto model)
        {
            try
            {
                var book = _bookRepo.GetById(bookId);
                if (book == null)
                {
                    throw new InvalidOperationException("Book does not exist!");
                }
                else
                {                   
                    var hpLink = new Hyperlink
                    {
                        Name = model.Name,
                        Link = model.Link,
                        BookId = book.Id
                    };
                    return _hpLinkRepo.Insert(hpLink);
                }
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
