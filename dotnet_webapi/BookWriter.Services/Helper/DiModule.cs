using System;
using System.Collections.Generic;
using System.Text;
using BookWriter.DataAccess;
using BookWriter.DataAccess.Interfaces;
using BookWriter.DataAccess.Repositories;
using BookWriter.Domain.DomainModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace BookWriter.Services.Helper
{
    public static class DiModule
    {
        public static IServiceCollection RegisterModule(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<BookWriterDbContext>(option =>
                     option.UseSqlServer(connectionString, 
                           option => option.MigrationsAssembly("BookWriter.DataAccess")));

            services.AddIdentity<User, IdentityRole>(option =>
            {
                option.User.RequireUniqueEmail = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequiredLength = 8;
            })
             .AddRoleManager<RoleManager<IdentityRole>>()
             .AddEntityFrameworkStores<BookWriterDbContext>()
             .AddSignInManager<SignInManager<User>>()
             .AddDefaultTokenProviders();

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
                                opt.TokenLifespan = TimeSpan.FromHours(2));

            services.AddTransient<IRepository<Article>, ArticleRepo>();
            services.AddTransient<IRepository<Book>, BookRepo>();
            services.AddTransient<IRepository<BookComment>, BookCommentRepo>();
            services.AddTransient<IRepository<BookLike>, BookLikeRepo>();
            services.AddTransient<IRepository<Hyperlink>, HyperlinkRepo>();
            services.AddTransient<IUserRepository, UserRepo>();
            services.AddTransient<IRepository<Contact>, ContactRepo>();
            
            return services;
        }
    }
}
