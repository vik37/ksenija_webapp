using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Helper.AppValidation.HelperValidation;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation
{
    public class BookValidator : AbstractValidator<BookDto>
    {
        public BookValidator()
        {
            RuleFor(b => b.Name)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .Length(3, 100);               
            RuleFor(b => b.Description)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .Length(10,50000);
            RuleFor(b => b.DateOfPublish)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .GreaterThanOrEqualTo(1999)
                .LessThanOrEqualTo(2050);
            RuleFor(b => b.Publisher)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .MaximumLength(50);
            RuleFor(b => b.Genre1)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .IsInEnum();
            RuleFor(b => b.Genre2)
                .IsInEnum();
            RuleFor(b => b.Genre3)
                .IsInEnum();
            RuleFor(b => b.Genre4)
                .IsInEnum();
            RuleFor(b => b.Pages)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .GreaterThan(20)
                .LessThanOrEqualTo(10000);
            RuleFor(b => b.Market)
                .IsInEnum();
            RuleFor(b => b.Country)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("{PropertyName} should not be empty!")
                .Length(1, 4)
                .Must(BoolValidation.IsValidName).WithMessage("{PropertyName} should be all letters");
            RuleForEach(b => b.Links).SetValidator(new HyperlinkValidator());
        }
    }
}
