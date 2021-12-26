using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IContactService
    {
        IEnumerable<ContactDto> GetAll();
        int AddContact(ContactDto model);
        int DeleteContact(int id);
    }
}
