using AutoMapper;
using BookWriter.Domain.DomainModels;
using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookWriter.Services.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Article, ArticleDto>()
                .ReverseMap();

            CreateMap<Book, BookDto>()
                .ForMember(dest => dest.ImageName, src => src.MapFrom(x => x.Image))
                .ForMember(dest => dest.BookLikes, src => src.MapFrom(x => x.BookLike))
                .ReverseMap()
                .ForMember(dest => dest.Image, src => src.MapFrom(x => x.ImageName))
                .ForMember(dest => dest.BookLike, src => src.MapFrom(x => x.BookLikes));
                
            CreateMap<BookComment, BookCommentDto>()
                .ForMember(dest => dest.BookComment, src => src.MapFrom(x => x.Comment))
                .ForMember(dest => dest.Book, src => src.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.BookId,src => src.Ignore())
                .ForMember(dest => dest.UserId,src => src.Ignore())
                .ForMember(dest => dest.User,src => src.Ignore());

            CreateMap<Contact, ContactDto>()
                .ReverseMap()
                .ForMember(dest => dest.UserId, src => src.Ignore());
            CreateMap<BookLike, BookLikeDto>()
                .ReverseMap()
                .ForMember(x => x.BookId, src => src.Ignore())
                .ForMember(x => x.UserId, src => src.Ignore());
        }
    }
}
