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
    public class PatientDataControllerTest
    {
        Mock<IPatientDataService> mock;

        [SetUp]
        public void SetUp()
        {
            mock = new Mock<IPatientDataService>();
        }

        [Test]
        public void GetDoctors_ValidCountOfRecords()
        {
            // Arrange
            var fake_info = GetFakeDiseaseInfo();
            mock.Setup(repo => repo.GetDiagnoseInfo(168,833).Returns(fake_info);
            var controller = new PatientDataController(mock.Object);

            // Act
            var response = (controller.GetDiagnoseInfo(168, 833) as OkNegotiatedContentResult<DiseaseInfo>).Content;

            // Assert
            Assert.AreEqual(response, fake_info);
        }

        
        public DiseaseInfo GetFakeDiseaseInfo()
        {
            var diseaseInfo = new DiseaseInfo
            {
                DoctorOpenFirstName = "Oleg",
                DoctorOpenLastName = "Smachnyy",
                StartDateTime = new DateTime(2015, 10, 12, 12,30, 0),
                Description = "patient Smachnyy is ill",
                Treatment = "patient Smachnyy is very ill"
            };
            return diseaseInfo;
        }

        public List<string[]> GetFakeProfessions(bool isStatic)
        {
            var list = new List<string[]>();
            list.Add(new string[] { "therapist", "1", "true" });
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
