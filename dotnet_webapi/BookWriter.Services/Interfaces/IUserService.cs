using BookWriter.DtoModels.DtoEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookWriter.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<UserDto> GetAll();
        LoginDto Register(RegisterDto model);
        LoginDto Login(LoginDto model, out bool isAdmin);
        void Logout();
        void UpdateUsername(string username, ResetUsernameDto model);
        void ForgetPassword(ForgottenPasswordDto model);
        void ResetPassword(ResetPasswordDto model);
        void Delete(string username);

    }
}
