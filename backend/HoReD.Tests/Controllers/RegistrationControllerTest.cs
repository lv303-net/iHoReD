using System;
using System.Text;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using HoReD.Controllers;
using Entities;
using Entities.Services;
using NUnit.Framework;
using Moq;
using HoReD;
using HoReD.Models;
using System.Web.Http.Results;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace HoReD.Tests.Controllers
{
    [TestFixture]
    public class RegistrationControllerTest
    {
        Mock<IUserService> moq;
        private IUserService moqService;
        private RegistrationController controller;

        [SetUp]
        public void SetUp()
        {
            moq = new Mock<IUserService>();
            moq.Setup(s => s.StoringInfoAboutNewUser(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()));
            moqService = moq.Object;
            controller= new RegistrationController(moqService);

        }

        [Test]
        public void CreateNewUser_ReturnOK()
        {
            var model = GetFakeBindingModel();
            var result = controller.CreateNewUser(model);

            Assert.IsInstanceOf<UnauthorizedResult>(result);
        }

        [Test]
        public void CreateNewUser_FName_IsInValid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "t",
                LastName = "testLastName",
                Email = "olya@ukr.net",
                Password = "testPassword1$",
                Phone = "0639639999"
            };

            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults,true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsFalse(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_LName_IsInValid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "t",
                Email = "olya@ukr.net",
                Password = "testPassword1$",
                Phone = "0639639999"
            };

            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsFalse(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_Email_IsValid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "testLastName",
                Email = "olya@ukr.net",
                Password = "testPassword1$",
                Phone = "0639639999"
            };

            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults,true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsTrue(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_Email_IsInvalid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "testLastName",
                Email = "rgnn@ukr",
                Password = "testPassword1$",
                Phone = "0639639999"
            };

            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults,true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsFalse(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_Password_IsInvalid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "testLastName",
                Email = "rgnn@ukr.net",
                Password = "invalidPassword",
                Phone = "0639639999"
            };

            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsFalse(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_Password_IsValid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "testLastName",
                Email = "rgnn@ukr.net",
                Password = "invalidPassword1",
                Phone = "0639639999"
            };
            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsTrue(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_Phone_IsInvalid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "testLastName",
                Email = "rgnn@ukr.net",
                Password = "testPassword1$",
                Phone = "0639637"
            };
            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults,true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsFalse(controller.ModelState.IsValid);
        }

        [Test]
        public void CreateNewUser_Phone_IsValid()
        {
            var model = new RegistrationBindingModel()
            {
                FirstName = "testFirstName",
                LastName = "testLastName",
                Email = "rgnn@ukr.net",
                Password = "testPassword1",
                Phone = "0639639999"
            };
            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }

            Assert.IsTrue(controller.ModelState.IsValid);
        }

        public RegistrationBindingModel GetFakeBindingModel()
        {
            var testParameter = new RegistrationBindingModel()
            {
                FirstName = "TestFirstname",
                LastName = "TestLastname",
                Email = "testEmail@ukr.net",
                Password = "testPassword1$",
                Phone = "0639637918"
            };
            return testParameter;
        }
    }
}
