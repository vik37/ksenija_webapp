using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Helper.AppValidation.HelperValidation;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation
{
    public class HyperlinkValidator : AbstractValidator<HyperlinkDto>
    {
        public HyperlinkValidator()
        {
            RuleFor(hl => hl.Name)
                .Length(3, 200);
            RuleFor(hl => hl.Link)
                .Cascade(CascadeMode.Stop)
                .MinimumLength(10)
                .MaximumLength(2100)
                .Must(BoolValidation.IsValidLink)
                .WithMessage("Sorry, But any link start with http :)");
        }
    }
}
