using BookWriter.DtoModels.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookWriter.DtoModels.DtoEntities
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DateOfPublish { get; set; }
        public string Publisher { get; set; }
        public GenreDto Genre1 { get; set; }
        public GenreDto Genre2 { get; set; }
        public GenreDto Genre3 { get; set; }
        public GenreDto Genre4 { get; set; }
        public int Pages { get; set; }
        public MarketDto Market { get; set; }
        public string Country { get; set; }
        public string ImageName { get; set; }
        public List<HyperlinkDto> Links { get; set; }
        public List<BookCommentDto> BookComments { get; set; }
        public List<BookLikeDto> BookLikes { get; set; }
    }
}
