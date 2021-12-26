using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IArticleService
    {
        IEnumerable<ArticleDto> GetAll();
        ArticleDto GetById(int id);
        int AddArticle(ArticleDto model);
        int Delete(int id);
    }
}
