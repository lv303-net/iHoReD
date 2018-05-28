using System;
using System.Text;
using System.Collections.Generic;
using HoReD.Controllers;
using Entities;
using Entities.Services;
using NUnit.Framework;
using Moq;
using System.Web.Http.Results;

namespace HoReDTests.Controllers
{
    /// <summary>
    /// Summary description for DoctorControllerTest

    /// </summary>
    [TestFixture]
    public class DoctorControllerTest
    {
        Mock<IDoctorService> mock;

        [SetUp]
        public void SetUp()
        {
            mock = new Mock<IDoctorService>();            
        }

        [Test]
        public void GetDoctors_ValidCountOfRecords()
        {
            // Arrange
            var fake_list = GetFakeDoctors();
            mock.Setup(repo => repo.GetDoctors()).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var response = (controller.GetDoctors() as OkNegotiatedContentResult<List<DoctorInfo>>).Content.Count;

            // Assert
            Assert.AreEqual(response, fake_list.Count);
        }

        [Test]
        public void GetDoctors_ReturnedValuesValid()
        {
            // Arrange
            var fake_list = GetFakeDoctors();
            mock.Setup(repo => repo.GetDoctors()).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var result = (controller.GetDoctors() as OkNegotiatedContentResult<List<DoctorInfo>>).Content;

            // Assert
            Assert.AreEqual(result[0].FirstName, fake_list[0].FirstName);
            Assert.AreEqual(result[0].LastName, fake_list[0].LastName);
            Assert.AreEqual(result[0].Image, fake_list[0].Image);
            Assert.AreEqual(result[0].ProfessionName, fake_list[0].ProfessionName);
        }

        [Test]
        [TestCase (1)]
        public void GetDoctorsByProffesion_ReturnedValuesValid(int profession)
        {
            // Arrange
            var fake_list = GetFakeDoctorsByProfession(profession);
            mock.Setup(repo => repo.GetDoctorsByProfessionId(profession)).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var result = (controller.GetDoctorsByProfession(profession) as OkNegotiatedContentResult<List<string[]>>).Content;

            // Assert
            Assert.AreEqual(result[0][0].ToString(), fake_list[0][0]);
            Assert.AreEqual(result[0][1].ToString(), fake_list[0][1]);
            Assert.AreEqual(result[1][0].ToString(), fake_list[1][0]);
            Assert.AreEqual(result[1][1].ToString(), fake_list[1][1]);
        }

        [Test]
        public void GetDoctorsByProfession_ValidCountOfRecords()
        {
            // Arrange
            int prof = 1;
            var fake_list = GetFakeDoctorsByProfession(prof);
            mock.Setup(repo => repo.GetDoctorsByProfessionId(prof)).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var response = (controller.GetDoctorsByProfession(prof) as OkNegotiatedContentResult<List<string[]>>).Content.Count;

            // Assert
            Assert.AreEqual(response, fake_list.Count);
        }

        [Test]
        public void GetProffesions_ReturnedValuesValid()
        {

            // Arrange
            bool stat = false;
            var fake_list = GetFakeProfessions(stat);
            mock.Setup(repo => repo.GetProfessions(stat)).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var result = (controller.GetProfessions(stat) as OkNegotiatedContentResult<List<string[]>>).Content;


            // Assert
            Assert.AreEqual(result[0], fake_list[0]);
            Assert.AreEqual(result[1], fake_list[1]);
            Assert.AreEqual(result[2], fake_list[2]);
        }

        [Test]
        public void GetProfessions_ValidCountOfRecords()
        {
            // Arrange
            bool stat = false;
            var fake_list = GetFakeProfessions(stat);
            mock.Setup(repo => repo.GetProfessions(stat)).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var response = (controller.GetProfessions(stat) as OkNegotiatedContentResult<List<string[]>>).Content.Count;

            // Assert
            Assert.AreEqual(response, fake_list.Count);
        }

        [Test]
        public void GetDoctorSalaryStatistics_ValidCountOfRecords()
        {
            // Arrange
            int doctorId = 1;
            DateTime dateStart = new DateTime(2018, 01, 30);
            DateTime dateFinish = new DateTime(2018, 01, 30);
            var fake_list = GetFakeDoctorSalaryStatistics(doctorId, dateStart, dateFinish);
            mock.Setup(repo => repo.GetDoctorSalaryStatisticsSplitedByMonths(doctorId, dateStart, dateFinish)).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var response = (controller.GetDoctorSalaryStatistics(doctorId, dateStart, dateFinish) as OkNegotiatedContentResult<List<SalaryStatistics>[]>).Content;


            // Assert
            Assert.AreEqual(response.Length, fake_list.Length);
        }

        [Test]
        public void GetDoctorSalaryStatistics_ReturnedValuesValid()
        {
            // Arrange
            int doctorId = 1;
            DateTime dateStart = new DateTime(2018, 01, 30);
            DateTime dateFinish = new DateTime(2018, 01, 30);
            var fake_list = GetFakeDoctorSalaryStatistics(doctorId, dateStart, dateFinish);
            mock.Setup(repo => repo.GetDoctorSalaryStatisticsSplitedByMonths(doctorId, dateStart, dateFinish)).Returns(fake_list);
            var controller = new DoctorController(mock.Object);

            // Act
            var response = (controller.GetDoctorSalaryStatistics(doctorId, dateStart, dateFinish) as OkNegotiatedContentResult<List<SalaryStatistics>[]>).Content;


            // Assert
            Assert.AreEqual(response[0], fake_list[0]);
        }
        public List<DoctorInfo> GetFakeDoctors()
        {
            var list = new List<DoctorInfo>();
            var doctor1 = new DoctorInfo
            {
                Id = 1,
                FirstName = "name1",
                LastName = "name2",
                ProfessionName = "therapist",
                EmployingDate = new DateTime(2018, 12, 25, 10, 30, 50),
                StartHour = new TimeSpan(5, 15, 15),
                EndHour = new TimeSpan(5, 15, 15),
                Image = "1.jpg"
            };
            var doctor2 = new DoctorInfo
            {
                Id = 2,
                FirstName = "name3",
                LastName = "name4",
                ProfessionName = "therapist",
                EmployingDate = new DateTime(2012, 12, 25, 10, 30, 50),
                StartHour = new TimeSpan(5, 15, 15),
                EndHour = new TimeSpan(5, 15, 15),
                Image = "2.jpg"
            };
            list.Add(doctor1);
            list.Add(doctor2);
            return list;
        }

        public List<string[]> GetFakeProfessions(bool isStatic)
        {
            var list = new List<string[]>();
            list.Add(new string[] { "therapist", "1" ,"true"});
            list.Add(new string[] { "dentist", "2", "true" });
            list.Add(new string[] { "ophtalmologist", "3", "true" });
            return list;
        }

        public List<string[]> GetFakeDoctorsByProfession(int profession)
        {
            var list = new List<string[]>();
            var prof1 = new string[] { "Halenok", "Iryna" };
            var prof2 = new string[] { "Solyar", "Olya" };
            list.Add(prof1);
            list.Add(prof2);
            return list;
        }

        public List<SalaryStatistics>[] GetFakeDoctorSalaryStatistics(int doctorId, DateTime dateStart, DateTime dateFinish)
        {
            var list = new List<SalaryStatistics>[1];
            list[0] = new List<SalaryStatistics> { new SalaryStatistics { Day = new DateTime(2018, 01, 30), WorkedHours = 2.50, SalaryRate = 80.00, SalaryCoefficient = 2.00, EarnedMoney = 400.00 },
             new SalaryStatistics { Day = null, WorkedHours = 2.50, SalaryRate = 80.00, SalaryCoefficient = 2.00, EarnedMoney = 400.00 }};
           
            return list;
           
        }

    }
}
