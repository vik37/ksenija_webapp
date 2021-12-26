using BookWriter.DataAccess.Interfaces;
using BookWriter.Domain.DomainModels;
using BookWriter.DtoModels.DtoEntities;
using BookWriter.DtoModels.DtoEntities.SettingsModel;
using BookWriter.Services.Helper.AppValidation.CustomExceptions;
using BookWriter.Services.Interfaces;
using EmailService.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace BookWriter.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IRepository<BookComment> _bookCommentRepo;
        private readonly IRepository<BookLike> _bookLikeRepo;
        private readonly IOptions<JwtSetting> _jwtSetting;
        private readonly IEmailSender _emailSender;
        private readonly IRepository<Contact> _contactRepo;
        public UserService(IUserRepository userRepo, 
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IPasswordHasher<User> passwordHasher,
            IRepository<BookComment> bookCommentRepo,
            IRepository<BookLike> bookLikeRepo,
            IOptions<JwtSetting> jwtSetting,
            IEmailSender emailSender,
            IRepository<Contact> contactRepo)           
        {
            _userRepo = userRepo;
            _signInManager = signInManager;
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _bookCommentRepo = bookCommentRepo;
            _jwtSetting = jwtSetting;
            _bookLikeRepo = bookLikeRepo;
            _emailSender = emailSender;
            _contactRepo = contactRepo;
        }

        public IEnumerable<UserDto> GetAll()
        {
            var users = _userRepo.GetAll();
            List<UserDto> models = new List<UserDto>();
            foreach (var user in users)
            {
                models.Add(new UserDto()
                {
                    Firstname = user.Firstname,
                    Lastname = user.Lastname,
                    Username = user.UserName,
                }); 
            }
            return models;
        }             
        public LoginDto Register(RegisterDto model)
        {
            try
            {
                var userByUsername = _userManager.FindByNameAsync(model.Username).Result;
                if (userByUsername != null)
                {
                    throw new UserException(model.Username);
                }
                User user = new User
                {
                    Firstname = model.Firstname,
                    Lastname = model.Lastname,
                    Email = model.Email,
                    UserName = model.Username,
                };
                var password = model.Password;

                var result = _userManager.CreateAsync(user, password).Result;
                bool isAdmin = false;
                if (result.Succeeded)
                {
                    var currentUser = _userManager.FindByNameAsync(user.UserName).Result;
                    var roleResult = _userManager.AddToRoleAsync(currentUser, "user").Result;
                    if (roleResult.Succeeded)
                    {
                        var newUser = Login(new LoginDto
                        {
                            Username = model.Username,
                            Password = model.Password
                        }, out isAdmin);
                        return newUser;
                    }
                    else
                    {
                        throw new Exception("Adding user to role failed!");
                    }
                }
                else
                {
                    throw new Exception("Registration Faild!");
                }
            }
            catch(UserException ex)
            {
                throw new UserException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }           
        }

        public LoginDto Login(LoginDto model, out bool isAdmin)
        {
            try
            {                              
                var result = _signInManager.PasswordSignInAsync(model.Username, model.Password, false,false).Result;
                string tokent = "";
                User user = _userManager.FindByNameAsync(model.Username).Result;
                isAdmin = false;
                if (result.Succeeded)
                {
                    isAdmin = _userManager.IsInRoleAsync(user, "admin").Result;
                    string admin = isAdmin?"admin":"user";
                    tokent = GenerateJwtToken(user, admin);
                    return new LoginDto()
                    {
                        Username = user.UserName,
                        Token = tokent
                    };
                }
                else
                {
                    throw new LoginException("Incorrect Username or Password!");
                }
            }
            catch(LoginException ex)
            {
                throw new LoginException(ex.Message);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        private string GenerateJwtToken(User user, string admin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var seacret = Encoding.ASCII.GetBytes(_jwtSetting.Value.Seacret);
            var tokenDescrioption = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, $"{user.Firstname} {user.Lastname}"),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, admin),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.Now.AddDays(_jwtSetting.Value.ExpireDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(seacret), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescrioption);
            return tokenHandler.WriteToken(token);
        }
        public void Logout()
        {
            _signInManager.SignOutAsync();
        }

        public void UpdateUsername(string username,ResetUsernameDto model)
        {
            try
            {
                var user = _userManager.FindByNameAsync(username).Result;
                if(user == null)
                {
                    throw new InvalidOperationException($"User does not exist");
                }

                user.UserName = model.Username;
                var result = _userManager.UpdateAsync(user).Result;
                if (!result.Succeeded)
                {
                    throw new Exception("Sommething wrong!");
                }
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public void ForgetPassword(ForgottenPasswordDto model)
        {
            try
            {
                var user = _userManager.FindByEmailAsync(model.Email).Result;
                if (user == null)
                {
                    throw new InvalidOperationException("Invalid Email Address");
                }
                bool isAdmin = _userManager.IsInRoleAsync(user, "admin").Result;
                string admin = isAdmin ? "admin" : "user";
                string token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
                var param = new Dictionary<string, string> 
                {
                    {"token",token },
                    {"email",model.Email }
                };
                var callback = QueryHelpers.AddQueryString(model.ClientURI, param);
                var message = new Message(new string[] { user.Email }, "Reset Password", callback);
                if(model.CurrentLanguage == null)
                {
                    throw new Exception("Language can not be empty");
                }
                _emailSender.SendEmail(message, model.CurrentLanguage);
                
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
        public void ResetPassword(ResetPasswordDto model)
        {
            try
            {
                var user = _userManager.FindByEmailAsync(model.Email).Result;
                if(user == null)
                {
                    throw new InvalidOperationException("Invalid Request");
                }
                
                var resetPasswordResult = _userManager.ResetPasswordAsync(user, model.Token, model.Password).Result;
                if (!resetPasswordResult.Succeeded)
                {
                    throw new Exception("Something bad happend");
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
        public void Delete(string username)
        {
            try
            {
                var user = _userManager.FindByNameAsync(username).Result;
                if(user == null)
                {
                    throw new InvalidOperationException("The user does not exist");
                }
                var bookComments = _bookCommentRepo.GetAll().Where(bc => bc.UserId == user.Id).ToList();
                foreach (var comment in bookComments)
                {
                    _bookCommentRepo.Delete(comment.Id);
                }
                var bookLikes = _bookLikeRepo.GetAll().Where(bl => bl.UserId == user.Id).ToList();
                foreach(var like in bookLikes)
                {
                    _bookLikeRepo.Delete(like.Id);
                }
                var contactMessages = _contactRepo.GetAll().Where(c => c.UserId == user.Id).ToList();
                foreach(var contact in contactMessages)
                {
                    _contactRepo.Delete(contact.Id);
                }
                var result = _userManager.DeleteAsync(user).Result;
                if (!result.Succeeded)
                {
                    throw new Exception("Sommething wrong happend!");
                }
            }
            catch(InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            catch (Exception ex)
            {
                if(ex.InnerException != null)
                {
                    throw new Exception(ex.InnerException.Message);
                }
                throw new Exception(ex.Message);
            }
        }

        
    }
}
