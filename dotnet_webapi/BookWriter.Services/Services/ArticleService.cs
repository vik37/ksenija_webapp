using AutoMapper;
using BookWriter.DataAccess.Interfaces;
using BookWriter.Domain.DomainModels;
using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookWriter.Services.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IRepository<Article> _articleRepo;
        private readonly IMapper _mapper;
        public ArticleService(IRepository<Article> articleRepo, IMapper mapper
            )
        {
            _articleRepo = articleRepo;
            _mapper = mapper;
        }
        [AllowAnonymous]
        public IEnumerable<ArticleDto> GetAll()
        {
            var articles = _articleRepo.GetAll().ToList();
            return _mapper.Map<List<Article>, List<ArticleDto>>(articles);
        }
        public ArticleDto GetById(int id)
        {
            try
            {
                var article = _articleRepo.GetById(id);
                if (article == null)
                {
                    throw new InvalidOperationException($"Article does not exist!");
                }
                else
                {
                    return _mapper.Map<ArticleDto>(article);
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
        public int AddArticle(ArticleDto model)
        {
            try
            {
                var articleMap = _mapper.Map<Article>(model);
                return _articleRepo.Insert(articleMap);
            }
            catch (Exception ex)
            {
                string message = $"{ex.Message}";
                throw new Exception(message);
            }
        }
        public int Delete(int id)
        {
            try
            {
                var article = _articleRepo.GetById(id);
                if(article == null)
                {
                    throw new InvalidOperationException($"Article does not exist!");
                }
                else
                {                  
                    return _articleRepo.Delete(article.Id);
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
