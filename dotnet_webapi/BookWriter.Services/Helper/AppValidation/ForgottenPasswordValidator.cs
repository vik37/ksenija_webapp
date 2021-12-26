using BookWriter.DtoModels.DtoEntities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation
{
    public class ForgottenPasswordValidator : AbstractValidator<ForgottenPasswordDto>
    {
        public ForgottenPasswordValidator()
        {
            RuleFor(ur => ur.Email)
               .Cascade(CascadeMode.Stop)
               .NotEmpty().WithMessage("{PropertyName} should not be empty!")
               .MaximumLength(150)
               .MinimumLength(10)
               .EmailAddress().WithMessage("Valid email is required!");
        }
    }
}
