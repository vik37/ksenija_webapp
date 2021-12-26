using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IHyperLinkService
    {
        IEnumerable<HyperlinkDto> GetAll(int bookId);
        int AddNewHpInBook(int bookId, HyperlinkDto model);
        int RemoveHpLink(int bookId, int hpLinkId);
    }
}
