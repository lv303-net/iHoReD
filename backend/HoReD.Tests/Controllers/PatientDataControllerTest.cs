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
        public void GetClosedDiseaseInfo()
        {
            // Arrange

            var fake_info = GetFakeClosedDiseases();
            mock.Setup(repo => repo.GetClosedDiseaseInfo(168)).Returns(fake_info);

            var controller = new PatientDataController(mock.Object);

            // Act
            var response = (controller.GetClosedDiseaseInfo(168) as OkNegotiatedContentResult<List<DiseaseInfo>>).Content;
            
            // Assert
            Assert.AreEqual(response, fake_info);
        }
        public List<DiseaseInfo> GetFakeClosedDiseases()
        {
            var list = new List<DiseaseInfo> ();
            var info1 = new DiseaseInfo
            {
                Id = 1,
                DiseaseName = "Cholera",
                DoctorOpenFirstName = "Ivan",
                DoctorOpenLastName = "Petrov",
                StartDateTime = new DateTime(2015, 10, 12, 12, 30, 00),
                Description = "tttttttttttttttttttttttt",
                Treatment = "ddddddddddddddddddddddddd",
                DoctorCloseFirstName = "Mykola",
                DoctorCloseLastName = "Buga",
                EndDateTime = new DateTime(2018, 11, 12, 10, 30, 00)
            };
            var info2 = new DiseaseInfo
            {
                Id = 2,
                DiseaseName = "Gryp",
                DoctorOpenFirstName = "Ivanna",
                DoctorOpenLastName = "Shpack",
                StartDateTime = new DateTime(2010, 8, 12, 19, 30, 00),
                Description = "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
                Treatment = "yyyyyyyyyyyyyyyyyyyyy",
                DoctorCloseFirstName = "Mykola",
                DoctorCloseLastName = "Tuz",
                EndDateTime = new DateTime(2017, 2, 21, 10, 00, 00)
            };
            list.Add(info1);
            list.Add(info2);
            return list;
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

    }
}
