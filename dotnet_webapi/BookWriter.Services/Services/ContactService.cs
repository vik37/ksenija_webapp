using AutoMapper;
using BookWriter.DataAccess.Interfaces;
using BookWriter.Domain.DomainModels;
using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using BookWriter.Services.Helper.AppValidation.CustomExceptions;

namespace BookWriter.Services.Services
{
    public class ContactService : IContactService
    {
        private readonly IRepository<Contact> _contactRepo;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public ContactService(IRepository<Contact> contactRepo, 
            IMapper mapper, UserManager<User> userManager)
        {
            _contactRepo = contactRepo;
            _mapper = mapper;
            _userManager = userManager;
        }
        public IEnumerable<ContactDto> GetAll()
        {
            var contact = _contactRepo.GetAll().ToList();
            return _mapper.Map<List<Contact>, List<ContactDto>>(contact);
        }
        public int AddContact(ContactDto model)
        {
            try
            {
                var user = _userManager.FindByEmailAsync(model.Email).Result; 
                if(user == null)
                {
                    var contact = new Contact
                    {
                        Name = model.Name,
                        Email = model.Email,
                        Message = model.Message,
                        UserId = null
                    };
                    return _contactRepo.Insert(contact);
                }
                else
                {
                    var contact = new Contact
                    {
                        Name = model.Name,
                        Email = model.Email,
                        Message = model.Message,
                        UserId = user.Id
                    };
                    return _contactRepo.Insert(contact);
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

        public int DeleteContact(int id)
        {
            try
            {
                var contact = _contactRepo.GetById(id);
                if(contact == null)
                {
                    throw new InvalidOperationException("Contact does not exist!");
                }
                return _contactRepo.Delete(contact.Id);
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
