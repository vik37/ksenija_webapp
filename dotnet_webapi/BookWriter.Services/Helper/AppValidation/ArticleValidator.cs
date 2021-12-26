using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Helper.AppValidation.HelperValidation;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation
{
    public class ArticleValidator : AbstractValidator<ArticleDto>
    {
        public ArticleValidator()
        {
            RuleFor(a => a.Title)
                .Length(2, 200);
            RuleFor(a => a.Description)
                .Cascade(CascadeMode.Stop)
                .MinimumLength(5)
                .MaximumLength(100000);
            RuleFor(a => a.Link)
                .Cascade(CascadeMode.Stop)
                .MinimumLength(10)
                .MaximumLength(2100)
                .Must(BoolValidation.IsValidLink)
                .WithMessage("Sorry, But any link start with http :)");

        }
    }
}
