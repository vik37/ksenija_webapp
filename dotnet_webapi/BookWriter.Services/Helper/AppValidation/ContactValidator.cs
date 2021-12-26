using BookWriter.DtoModels.DtoEntities;
using BookWriter.Services.Helper.AppValidation.HelperValidation;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Helper.AppValidation
{
    public class ContactValidator :  AbstractValidator<ContactDto>
    {
        public ContactValidator()
        {
            RuleFor(x => x.Name)
                .Length(2,100);
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.Stop)
                .Length(10, 150)
                .EmailAddress();
            RuleFor(x => x.Message)
                .Cascade(CascadeMode.Stop)
                .MinimumLength(20)
                .MaximumLength(50000);
        }
    }
}
