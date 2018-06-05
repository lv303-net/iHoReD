# iHoReD

<a name='contents'></a>
# Contents [#](#contents 'Go To Here')

- [ApiDescriptionExtensions](#T-HoReD-Areas-HelpPage-ApiDescriptionExtensions 'HoReD.Areas.HelpPage.ApiDescriptionExtensions')
  - [GetFriendlyId(description)](#M-HoReD-Areas-HelpPage-ApiDescriptionExtensions-GetFriendlyId-System-Web-Http-Description-ApiDescription- 'HoReD.Areas.HelpPage.ApiDescriptionExtensions.GetFriendlyId(System.Web.Http.Description.ApiDescription)')
- [DoctorController](#T-HoReD-Controllers-DoctorController 'HoReD.Controllers.DoctorController')
  - [GetDoctorEvents()](#M-HoReD-Controllers-DoctorController-GetDoctorEvents-System-Int32,System-DateTime,System-DateTime- 'HoReD.Controllers.DoctorController.GetDoctorEvents(System.Int32,System.DateTime,System.DateTime)')
  - [GetDoctorEventsForDoctor(doctorId,dateStart,dateFinish)](#M-HoReD-Controllers-DoctorController-GetDoctorEventsForDoctor-System-Int32,System-DateTime,System-DateTime- 'HoReD.Controllers.DoctorController.GetDoctorEventsForDoctor(System.Int32,System.DateTime,System.DateTime)')
  - [GetDoctorGeneralSalaryStatistics(doctorId,dateStart,dateFinish)](#M-HoReD-Controllers-DoctorController-GetDoctorGeneralSalaryStatistics-System-Int32,System-DateTime,System-DateTime- 'HoReD.Controllers.DoctorController.GetDoctorGeneralSalaryStatistics(System.Int32,System.DateTime,System.DateTime)')
  - [GetDoctors()](#M-HoReD-Controllers-DoctorController-GetDoctors 'HoReD.Controllers.DoctorController.GetDoctors')
  - [GetDoctorSalaryStatistics(doctorId,dateStart,dateFinish)](#M-HoReD-Controllers-DoctorController-GetDoctorSalaryStatistics-System-Int32,System-DateTime,System-DateTime- 'HoReD.Controllers.DoctorController.GetDoctorSalaryStatistics(System.Int32,System.DateTime,System.DateTime)')
  - [GetDoctorsByProfession(professionId)](#M-HoReD-Controllers-DoctorController-GetDoctorsByProfession-System-Int32- 'HoReD.Controllers.DoctorController.GetDoctorsByProfession(System.Int32)')
- [DoctorScheduleController](#T-HoReD-Controllers-DoctorScheduleController 'HoReD.Controllers.DoctorScheduleController')
  - [GetDoctorSchedule()](#M-HoReD-Controllers-DoctorScheduleController-GetDoctorSchedule-System-Int32- 'HoReD.Controllers.DoctorScheduleController.GetDoctorSchedule(System.Int32)')
- [HelpController](#T-HoReD-Areas-HelpPage-Controllers-HelpController 'HoReD.Areas.HelpPage.Controllers.HelpController')
- [HelpPageApiModel](#T-HoReD-Areas-HelpPage-Models-HelpPageApiModel 'HoReD.Areas.HelpPage.Models.HelpPageApiModel')
  - [#ctor()](#M-HoReD-Areas-HelpPage-Models-HelpPageApiModel-#ctor 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.#ctor')
  - [ApiDescription](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ApiDescription 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.ApiDescription')
  - [ErrorMessages](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ErrorMessages 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.ErrorMessages')
  - [RequestBodyParameters](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestBodyParameters 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.RequestBodyParameters')
  - [RequestDocumentation](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestDocumentation 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.RequestDocumentation')
  - [RequestModelDescription](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestModelDescription 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.RequestModelDescription')
  - [ResourceDescription](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ResourceDescription 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.ResourceDescription')
  - [ResourceProperties](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ResourceProperties 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.ResourceProperties')
  - [SampleRequests](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-SampleRequests 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.SampleRequests')
  - [SampleResponses](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-SampleResponses 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.SampleResponses')
  - [UriParameters](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-UriParameters 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.UriParameters')
- [HelpPageConfig](#T-HoReD-Areas-HelpPage-HelpPageConfig 'HoReD.Areas.HelpPage.HelpPageConfig')
- [HelpPageConfigurationExtensions](#T-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions')
  - [GetHelpPageApiModel(config,apiDescriptionId)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetHelpPageApiModel-System-Web-Http-HttpConfiguration,System-String- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.GetHelpPageApiModel(System.Web.Http.HttpConfiguration,System.String)')
  - [GetHelpPageSampleGenerator(config)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetHelpPageSampleGenerator-System-Web-Http-HttpConfiguration- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.GetHelpPageSampleGenerator(System.Web.Http.HttpConfiguration)')
  - [GetModelDescriptionGenerator(config)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetModelDescriptionGenerator-System-Web-Http-HttpConfiguration- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.GetModelDescriptionGenerator(System.Web.Http.HttpConfiguration)')
  - [SetActualRequestType(config,type,controllerName,actionName)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualRequestType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetActualRequestType(System.Web.Http.HttpConfiguration,System.Type,System.String,System.String)')
  - [SetActualRequestType(config,type,controllerName,actionName,parameterNames)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualRequestType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String,System-String[]- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetActualRequestType(System.Web.Http.HttpConfiguration,System.Type,System.String,System.String,System.String[])')
  - [SetActualResponseType(config,type,controllerName,actionName)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualResponseType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetActualResponseType(System.Web.Http.HttpConfiguration,System.Type,System.String,System.String)')
  - [SetActualResponseType(config,type,controllerName,actionName,parameterNames)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualResponseType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String,System-String[]- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetActualResponseType(System.Web.Http.HttpConfiguration,System.Type,System.String,System.String,System.String[])')
  - [SetDocumentationProvider(config,documentationProvider)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetDocumentationProvider-System-Web-Http-HttpConfiguration,System-Web-Http-Description-IDocumentationProvider- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetDocumentationProvider(System.Web.Http.HttpConfiguration,System.Web.Http.Description.IDocumentationProvider)')
  - [SetHelpPageSampleGenerator(config,sampleGenerator)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetHelpPageSampleGenerator-System-Web-Http-HttpConfiguration,HoReD-Areas-HelpPage-HelpPageSampleGenerator- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetHelpPageSampleGenerator(System.Web.Http.HttpConfiguration,HoReD.Areas.HelpPage.HelpPageSampleGenerator)')
  - [SetSampleForMediaType(config,sample,mediaType)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleForMediaType-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleForMediaType(System.Web.Http.HttpConfiguration,System.Object,System.Net.Http.Headers.MediaTypeHeaderValue)')
  - [SetSampleForType(config,sample,mediaType,type)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleForType-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-Type- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleForType(System.Web.Http.HttpConfiguration,System.Object,System.Net.Http.Headers.MediaTypeHeaderValue,System.Type)')
  - [SetSampleObjects(config,sampleObjects)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleObjects-System-Web-Http-HttpConfiguration,System-Collections-Generic-IDictionary{System-Type,System-Object}- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleObjects(System.Web.Http.HttpConfiguration,System.Collections.Generic.IDictionary{System.Type,System.Object})')
  - [SetSampleRequest(config,sample,mediaType,controllerName,actionName)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleRequest-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleRequest(System.Web.Http.HttpConfiguration,System.Object,System.Net.Http.Headers.MediaTypeHeaderValue,System.String,System.String)')
  - [SetSampleRequest(config,sample,mediaType,controllerName,actionName,parameterNames)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleRequest-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String,System-String[]- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleRequest(System.Web.Http.HttpConfiguration,System.Object,System.Net.Http.Headers.MediaTypeHeaderValue,System.String,System.String,System.String[])')
  - [SetSampleResponse(config,sample,mediaType,controllerName,actionName)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleResponse-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleResponse(System.Web.Http.HttpConfiguration,System.Object,System.Net.Http.Headers.MediaTypeHeaderValue,System.String,System.String)')
  - [SetSampleResponse(config,sample,mediaType,controllerName,actionName,parameterNames)](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleResponse-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String,System-String[]- 'HoReD.Areas.HelpPage.HelpPageConfigurationExtensions.SetSampleResponse(System.Web.Http.HttpConfiguration,System.Object,System.Net.Http.Headers.MediaTypeHeaderValue,System.String,System.String,System.String[])')
- [HelpPageSampleGenerator](#T-HoReD-Areas-HelpPage-HelpPageSampleGenerator 'HoReD.Areas.HelpPage.HelpPageSampleGenerator')
  - [#ctor()](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-#ctor 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.#ctor')
  - [ActionSamples](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActionSamples 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.ActionSamples')
  - [ActualHttpMessageTypes](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActualHttpMessageTypes 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.ActualHttpMessageTypes')
  - [SampleObjectFactories](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjectFactories 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.SampleObjectFactories')
  - [SampleObjects](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjects 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.SampleObjects')
  - [GetActionSample(controllerName,actionName,parameterNames,type,formatter,mediaType,sampleDirection)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetActionSample-System-String,System-String,System-Collections-Generic-IEnumerable{System-String},System-Type,System-Net-Http-Formatting-MediaTypeFormatter,System-Net-Http-Headers-MediaTypeHeaderValue,HoReD-Areas-HelpPage-SampleDirection- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.GetActionSample(System.String,System.String,System.Collections.Generic.IEnumerable{System.String},System.Type,System.Net.Http.Formatting.MediaTypeFormatter,System.Net.Http.Headers.MediaTypeHeaderValue,HoReD.Areas.HelpPage.SampleDirection)')
  - [GetSample(api,sampleDirection)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSample-System-Web-Http-Description-ApiDescription,HoReD-Areas-HelpPage-SampleDirection- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.GetSample(System.Web.Http.Description.ApiDescription,HoReD.Areas.HelpPage.SampleDirection)')
  - [GetSampleObject(type)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleObject-System-Type- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.GetSampleObject(System.Type)')
  - [GetSampleRequests(api)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleRequests-System-Web-Http-Description-ApiDescription- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.GetSampleRequests(System.Web.Http.Description.ApiDescription)')
  - [GetSampleResponses(api)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleResponses-System-Web-Http-Description-ApiDescription- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.GetSampleResponses(System.Web.Http.Description.ApiDescription)')
  - [ResolveHttpRequestMessageType(api)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ResolveHttpRequestMessageType-System-Web-Http-Description-ApiDescription- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.ResolveHttpRequestMessageType(System.Web.Http.Description.ApiDescription)')
  - [ResolveType(api,controllerName,actionName,parameterNames,sampleDirection,formatters)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ResolveType-System-Web-Http-Description-ApiDescription,System-String,System-String,System-Collections-Generic-IEnumerable{System-String},HoReD-Areas-HelpPage-SampleDirection,System-Collections-ObjectModel-Collection{System-Net-Http-Formatting-MediaTypeFormatter}@- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.ResolveType(System.Web.Http.Description.ApiDescription,System.String,System.String,System.Collections.Generic.IEnumerable{System.String},HoReD.Areas.HelpPage.SampleDirection,System.Collections.ObjectModel.Collection{System.Net.Http.Formatting.MediaTypeFormatter}@)')
  - [WriteSampleObjectUsingFormatter(formatter,value,type,mediaType)](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-WriteSampleObjectUsingFormatter-System-Net-Http-Formatting-MediaTypeFormatter,System-Object,System-Type,System-Net-Http-Headers-MediaTypeHeaderValue- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.WriteSampleObjectUsingFormatter(System.Net.Http.Formatting.MediaTypeFormatter,System.Object,System.Type,System.Net.Http.Headers.MediaTypeHeaderValue)')
- [HelpPageSampleKey](#T-HoReD-Areas-HelpPage-HelpPageSampleKey 'HoReD.Areas.HelpPage.HelpPageSampleKey')
  - [#ctor(mediaType)](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue- 'HoReD.Areas.HelpPage.HelpPageSampleKey.#ctor(System.Net.Http.Headers.MediaTypeHeaderValue)')
  - [#ctor(mediaType,type)](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue,System-Type- 'HoReD.Areas.HelpPage.HelpPageSampleKey.#ctor(System.Net.Http.Headers.MediaTypeHeaderValue,System.Type)')
  - [#ctor(sampleDirection,controllerName,actionName,parameterNames)](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-HoReD-Areas-HelpPage-SampleDirection,System-String,System-String,System-Collections-Generic-IEnumerable{System-String}- 'HoReD.Areas.HelpPage.HelpPageSampleKey.#ctor(HoReD.Areas.HelpPage.SampleDirection,System.String,System.String,System.Collections.Generic.IEnumerable{System.String})')
  - [#ctor(mediaType,sampleDirection,controllerName,actionName,parameterNames)](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue,HoReD-Areas-HelpPage-SampleDirection,System-String,System-String,System-Collections-Generic-IEnumerable{System-String}- 'HoReD.Areas.HelpPage.HelpPageSampleKey.#ctor(System.Net.Http.Headers.MediaTypeHeaderValue,HoReD.Areas.HelpPage.SampleDirection,System.String,System.String,System.Collections.Generic.IEnumerable{System.String})')
  - [ActionName](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-ActionName 'HoReD.Areas.HelpPage.HelpPageSampleKey.ActionName')
  - [ControllerName](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-ControllerName 'HoReD.Areas.HelpPage.HelpPageSampleKey.ControllerName')
  - [MediaType](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-MediaType 'HoReD.Areas.HelpPage.HelpPageSampleKey.MediaType')
  - [ParameterNames](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-ParameterNames 'HoReD.Areas.HelpPage.HelpPageSampleKey.ParameterNames')
  - [SampleDirection](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'HoReD.Areas.HelpPage.HelpPageSampleKey.SampleDirection')
- [ImageSample](#T-HoReD-Areas-HelpPage-ImageSample 'HoReD.Areas.HelpPage.ImageSample')
  - [#ctor(src)](#M-HoReD-Areas-HelpPage-ImageSample-#ctor-System-String- 'HoReD.Areas.HelpPage.ImageSample.#ctor(System.String)')
- [InvalidSample](#T-HoReD-Areas-HelpPage-InvalidSample 'HoReD.Areas.HelpPage.InvalidSample')
- [LoginController](#T-HoReD-Controllers-LoginController 'HoReD.Controllers.LoginController')
  - [LoginUser(model)](#M-HoReD-Controllers-LoginController-LoginUser-HoReD-Models-LoginUserBindingModel- 'HoReD.Controllers.LoginController.LoginUser(HoReD.Models.LoginUserBindingModel)')
  - [ResetPassword(model)](#M-HoReD-Controllers-LoginController-ResetPassword-HoReD-Models-ResetPasswordBindingModel- 'HoReD.Controllers.LoginController.ResetPassword(HoReD.Models.ResetPasswordBindingModel)')
  - [SendEmailForResettingPassword(model)](#M-HoReD-Controllers-LoginController-SendEmailForResettingPassword-HoReD-Models-LoginUserBindingModel- 'HoReD.Controllers.LoginController.SendEmailForResettingPassword(HoReD.Models.LoginUserBindingModel)')
- [MedicalCardController](#T-HoReD-Controllers-MedicalCardController 'HoReD.Controllers.MedicalCardController')
  - [GetMedicalCardByPatientId(userId,pageNumber,elementOnPageCount,columnNumber)](#M-HoReD-Controllers-MedicalCardController-GetMedicalCardByPatientId-System-Int32,System-Int32,System-Int32,System-Int32- 'HoReD.Controllers.MedicalCardController.GetMedicalCardByPatientId(System.Int32,System.Int32,System.Int32,System.Int32)')
  - [GetPageCount(userId,elementOnPageCount)](#M-HoReD-Controllers-MedicalCardController-GetPageCount-System-Int32,System-Int32- 'HoReD.Controllers.MedicalCardController.GetPageCount(System.Int32,System.Int32)')
- [MembershipController](#T-HoReD-Controllers-MembershipController 'HoReD.Controllers.MembershipController')
  - [Authenticate(loginInfo)](#M-HoReD-Controllers-MembershipController-Authenticate-HoReD-Models-LoginUserBindingModel- 'HoReD.Controllers.MembershipController.Authenticate(HoReD.Models.LoginUserBindingModel)')
- [ModelDescription](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescription 'HoReD.Areas.HelpPage.ModelDescriptions.ModelDescription')
- [ModelDescriptionGenerator](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescriptionGenerator 'HoReD.Areas.HelpPage.ModelDescriptions.ModelDescriptionGenerator')
- [ModelNameAttribute](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelNameAttribute 'HoReD.Areas.HelpPage.ModelDescriptions.ModelNameAttribute')
- [ObjectGenerator](#T-HoReD-Areas-HelpPage-ObjectGenerator 'HoReD.Areas.HelpPage.ObjectGenerator')
  - [GenerateObject(type)](#M-HoReD-Areas-HelpPage-ObjectGenerator-GenerateObject-System-Type- 'HoReD.Areas.HelpPage.ObjectGenerator.GenerateObject(System.Type)')
- [PatientDataController](#T-HoReD-Controllers-PatientDataController 'HoReD.Controllers.PatientDataController')
  - [AddMedicalRecord(model)](#M-HoReD-Controllers-PatientDataController-AddMedicalRecord-HoReD-Models-MedicalRecordBindingModel- 'HoReD.Controllers.PatientDataController.AddMedicalRecord(HoReD.Models.MedicalRecordBindingModel)')
  - [AddPatientAllergy(model)](#M-HoReD-Controllers-PatientDataController-AddPatientAllergy-HoReD-Models-MedicalRecordBindingModel- 'HoReD.Controllers.PatientDataController.AddPatientAllergy(HoReD.Models.MedicalRecordBindingModel)')
  - [AddPatientDisease(model)](#M-HoReD-Controllers-PatientDataController-AddPatientDisease-HoReD-Models-MedicalRecordBindingModel- 'HoReD.Controllers.PatientDataController.AddPatientDisease(HoReD.Models.MedicalRecordBindingModel)')
  - [ClosePatientAllergy(model)](#M-HoReD-Controllers-PatientDataController-ClosePatientAllergy-HoReD-Models-MedicalRecordBindingModel- 'HoReD.Controllers.PatientDataController.ClosePatientAllergy(HoReD.Models.MedicalRecordBindingModel)')
  - [ClosePatientDisease(model)](#M-HoReD-Controllers-PatientDataController-ClosePatientDisease-HoReD-Models-MedicalRecordBindingModel- 'HoReD.Controllers.PatientDataController.ClosePatientDisease(HoReD.Models.MedicalRecordBindingModel)')
  - [GetActiveAllergyInfo(idPatient,idAllergy)](#M-HoReD-Controllers-PatientDataController-GetActiveAllergyInfo-System-Int32,System-Int32- 'HoReD.Controllers.PatientDataController.GetActiveAllergyInfo(System.Int32,System.Int32)')
  - [GetCategories()](#M-HoReD-Controllers-PatientDataController-GetCategories 'HoReD.Controllers.PatientDataController.GetCategories')
  - [GetClosedAllergiesInfo(idPatient)](#M-HoReD-Controllers-PatientDataController-GetClosedAllergiesInfo-System-Int32- 'HoReD.Controllers.PatientDataController.GetClosedAllergiesInfo(System.Int32)')
  - [GetClosedDiseaseInfo(idPatient)](#M-HoReD-Controllers-PatientDataController-GetClosedDiseaseInfo-System-Int32- 'HoReD.Controllers.PatientDataController.GetClosedDiseaseInfo(System.Int32)')
  - [GetDiagnoseInfo(idPatient,idDisease)](#M-HoReD-Controllers-PatientDataController-GetDiagnoseInfo-System-Int32,System-Int32- 'HoReD.Controllers.PatientDataController.GetDiagnoseInfo(System.Int32,System.Int32)')
  - [GetDiseases(id)](#M-HoReD-Controllers-PatientDataController-GetDiseases-System-Int32- 'HoReD.Controllers.PatientDataController.GetDiseases(System.Int32)')
  - [GetPatientActiveAllergies(id)](#M-HoReD-Controllers-PatientDataController-GetPatientActiveAllergies-System-Int32- 'HoReD.Controllers.PatientDataController.GetPatientActiveAllergies(System.Int32)')
  - [GetPatientActiveDiseases(id)](#M-HoReD-Controllers-PatientDataController-GetPatientActiveDiseases-System-Int32- 'HoReD.Controllers.PatientDataController.GetPatientActiveDiseases(System.Int32)')
  - [GetPatientDataByPatientId(id)](#M-HoReD-Controllers-PatientDataController-GetPatientDataByPatientId-System-Int32- 'HoReD.Controllers.PatientDataController.GetPatientDataByPatientId(System.Int32)')
  - [GetPatientDiseases(idPatient,idDisease)](#M-HoReD-Controllers-PatientDataController-GetPatientDiseases-System-Int32,System-Int32- 'HoReD.Controllers.PatientDataController.GetPatientDiseases(System.Int32,System.Int32)')
  - [GetPatientNoNActiveAllergies(id)](#M-HoReD-Controllers-PatientDataController-GetPatientNoNActiveAllergies-System-Int32- 'HoReD.Controllers.PatientDataController.GetPatientNoNActiveAllergies(System.Int32)')
  - [GetSubCategories(id)](#M-HoReD-Controllers-PatientDataController-GetSubCategories-System-Int32- 'HoReD.Controllers.PatientDataController.GetSubCategories(System.Int32)')
- [RegistrationController](#T-HoReD-Controllers-RegistrationController 'HoReD.Controllers.RegistrationController')
  - [ActivateUser(IdUser)](#M-HoReD-Controllers-RegistrationController-ActivateUser-System-String- 'HoReD.Controllers.RegistrationController.ActivateUser(System.String)')
  - [CreateNewUser(model)](#M-HoReD-Controllers-RegistrationController-CreateNewUser-HoReD-Models-RegistrationBindingModel- 'HoReD.Controllers.RegistrationController.CreateNewUser(HoReD.Models.RegistrationBindingModel)')
- [RuleController](#T-HoReD-Controllers-RuleController 'HoReD.Controllers.RuleController')
  - [AddOrUpdate(model)](#M-HoReD-Controllers-RuleController-AddOrUpdate-HoReD-Models-RuleBindingModel- 'HoReD.Controllers.RuleController.AddOrUpdate(HoReD.Models.RuleBindingModel)')
  - [AssignDoctorToRule(model)](#M-HoReD-Controllers-RuleController-AssignDoctorToRule-HoReD-Models-RulesetBindingModel- 'HoReD.Controllers.RuleController.AssignDoctorToRule(HoReD.Models.RulesetBindingModel)')
  - [Delete(IdRule)](#M-HoReD-Controllers-RuleController-Delete-System-Int32- 'HoReD.Controllers.RuleController.Delete(System.Int32)')
  - [Delete(model)](#M-HoReD-Controllers-RuleController-Delete-HoReD-Models-RulesetBindingModel- 'HoReD.Controllers.RuleController.Delete(HoReD.Models.RulesetBindingModel)')
  - [GetDoctorsBYIdRule(IdRule,hasRule)](#M-HoReD-Controllers-RuleController-GetDoctorsBYIdRule-System-Int32,System-Boolean- 'HoReD.Controllers.RuleController.GetDoctorsBYIdRule(System.Int32,System.Boolean)')
- [SalaryController](#T-HoReD-Controllers-SalaryController 'HoReD.Controllers.SalaryController')
  - [#ctor()](#M-HoReD-Controllers-SalaryController-#ctor-Entities-Services-ISalaryService- 'HoReD.Controllers.SalaryController.#ctor(Entities.Services.ISalaryService)')
  - [AddNewCoeff(model)](#M-HoReD-Controllers-SalaryController-AddNewCoeff-HoReD-Models-SalaryCoeffBindingModel- 'HoReD.Controllers.SalaryController.AddNewCoeff(HoReD.Models.SalaryCoeffBindingModel)')
  - [AddNewRate(model)](#M-HoReD-Controllers-SalaryController-AddNewRate-HoReD-Models-SalaryRateBindingModel- 'HoReD.Controllers.SalaryController.AddNewRate(HoReD.Models.SalaryRateBindingModel)')
  - [DeleteCoeff(doctorId,startDate)](#M-HoReD-Controllers-SalaryController-DeleteCoeff-System-Int32,System-String,System-Int32- 'HoReD.Controllers.SalaryController.DeleteCoeff(System.Int32,System.String,System.Int32)')
  - [DeleteRate(professionId,startDate)](#M-HoReD-Controllers-SalaryController-DeleteRate-System-Int32,System-String,System-Int32- 'HoReD.Controllers.SalaryController.DeleteRate(System.Int32,System.String,System.Int32)')
  - [EditNewCoeff(model)](#M-HoReD-Controllers-SalaryController-EditNewCoeff-HoReD-Models-SalaryCoeffBindingModel- 'HoReD.Controllers.SalaryController.EditNewCoeff(HoReD.Models.SalaryCoeffBindingModel)')
  - [EditNewRate(model)](#M-HoReD-Controllers-SalaryController-EditNewRate-HoReD-Models-SalaryRateBindingModel- 'HoReD.Controllers.SalaryController.EditNewRate(HoReD.Models.SalaryRateBindingModel)')
  - [GetCoefficientsForDoctor(doctorId)](#M-HoReD-Controllers-SalaryController-GetCoefficientsForDoctor-System-Int32- 'HoReD.Controllers.SalaryController.GetCoefficientsForDoctor(System.Int32)')
  - [GetRatesForProfession(professionId)](#M-HoReD-Controllers-SalaryController-GetRatesForProfession-System-Int32- 'HoReD.Controllers.SalaryController.GetRatesForProfession(System.Int32)')
- [SampleDirection](#T-HoReD-Areas-HelpPage-SampleDirection 'HoReD.Areas.HelpPage.SampleDirection')
- [ScheduleController](#T-HoReD-Controllers-ScheduleController 'HoReD.Controllers.ScheduleController')
  - [InsertNewScheduleRecord(model)](#M-HoReD-Controllers-ScheduleController-InsertNewScheduleRecord-HoReD-Models-ScheduleBindingModel- 'HoReD.Controllers.ScheduleController.InsertNewScheduleRecord(HoReD.Models.ScheduleBindingModel)')
- [SimpleInjectorWebApiInitializer](#T-HoReD-App_Start-SimpleInjectorWebApiInitializer 'HoReD.App_Start.SimpleInjectorWebApiInitializer')
  - [Initialize()](#M-HoReD-App_Start-SimpleInjectorWebApiInitializer-Initialize 'HoReD.App_Start.SimpleInjectorWebApiInitializer.Initialize')
- [TextSample](#T-HoReD-Areas-HelpPage-TextSample 'HoReD.Areas.HelpPage.TextSample')
- [UserController](#T-HoReD-Controllers-UserController 'HoReD.Controllers.UserController')
  - [ChangeRole(currentUser,userId,role,idProffesion)](#M-HoReD-Controllers-UserController-ChangeRole-System-Int32,System-Int32,System-Int32,System-Int32- 'HoReD.Controllers.UserController.ChangeRole(System.Int32,System.Int32,System.Int32,System.Int32)')
  - [EditUserInfo(model)](#M-HoReD-Controllers-UserController-EditUserInfo-HoReD-Models-UserInfoBindingModel- 'HoReD.Controllers.UserController.EditUserInfo(HoReD.Models.UserInfoBindingModel)')
  - [FilterAllUsers(numberPage,countInPage,isAdmin,isDoctor,firstOrlastname)](#M-HoReD-Controllers-UserController-FilterAllUsers-System-Int32,System-Int32,System-Boolean,System-Boolean,System-String- 'HoReD.Controllers.UserController.FilterAllUsers(System.Int32,System.Int32,System.Boolean,System.Boolean,System.String)')
  - [GetInfoAboutAllUsers(numberPage,countInPage)](#M-HoReD-Controllers-UserController-GetInfoAboutAllUsers-System-Int32,System-Int32- 'HoReD.Controllers.UserController.GetInfoAboutAllUsers(System.Int32,System.Int32)')
  - [GetUserAvailableRole(idUser)](#M-HoReD-Controllers-UserController-GetUserAvailableRole-System-Int32- 'HoReD.Controllers.UserController.GetUserAvailableRole(System.Int32)')
  - [GetUserInfoById(UserInfoId)](#M-HoReD-Controllers-UserController-GetUserInfoById-System-Int32- 'HoReD.Controllers.UserController.GetUserInfoById(System.Int32)')
  - [GetUserRole(idUser)](#M-HoReD-Controllers-UserController-GetUserRole-System-Int32- 'HoReD.Controllers.UserController.GetUserRole(System.Int32)')
  - [ListFirstLastname(text)](#M-HoReD-Controllers-UserController-ListFirstLastname-System-String- 'HoReD.Controllers.UserController.ListFirstLastname(System.String)')
  - [NumbersOfPage(countInPage)](#M-HoReD-Controllers-UserController-NumbersOfPage-System-Int32- 'HoReD.Controllers.UserController.NumbersOfPage(System.Int32)')
  - [NumbersOfPageFiltered(countInPage,isAdmin,isDoctor,firstOrlastname)](#M-HoReD-Controllers-UserController-NumbersOfPageFiltered-System-Int32,System-Boolean,System-Boolean,System-String- 'HoReD.Controllers.UserController.NumbersOfPageFiltered(System.Int32,System.Boolean,System.Boolean,System.String)')
- [XmlDocumentationProvider](#T-HoReD-Areas-HelpPage-XmlDocumentationProvider 'HoReD.Areas.HelpPage.XmlDocumentationProvider')
  - [#ctor(documentPath)](#M-HoReD-Areas-HelpPage-XmlDocumentationProvider-#ctor-System-String- 'HoReD.Areas.HelpPage.XmlDocumentationProvider.#ctor(System.String)')

<a name='assembly'></a>
# HoReD [#](#assembly 'Go To Here') [=](#contents 'Back To Contents')

<a name='T-HoReD-Areas-HelpPage-ApiDescriptionExtensions'></a>
## ApiDescriptionExtensions [#](#T-HoReD-Areas-HelpPage-ApiDescriptionExtensions 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

<a name='M-HoReD-Areas-HelpPage-ApiDescriptionExtensions-GetFriendlyId-System-Web-Http-Description-ApiDescription-'></a>
### GetFriendlyId(description) `method` [#](#M-HoReD-Areas-HelpPage-ApiDescriptionExtensions-GetFriendlyId-System-Web-Http-Description-ApiDescription- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Generates an URI-friendly ID for the [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). E.g. "Get-Values-id_name" instead of "GetValues/{id}?name={name}"

##### Returns

The ID as a string.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| description | [System.Web.Http.Description.ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). |

<a name='T-HoReD-Controllers-DoctorController'></a>
## DoctorController [#](#T-HoReD-Controllers-DoctorController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Controller that represents information about Doctors

<a name='M-HoReD-Controllers-DoctorController-GetDoctorEvents-System-Int32,System-DateTime,System-DateTime-'></a>
### GetDoctorEvents() `method` [#](#M-HoReD-Controllers-DoctorController-GetDoctorEvents-System-Int32,System-DateTime,System-DateTime- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets information about Doctor events

##### Returns

List of instances of the class Event

##### Parameters

This method has no parameters.

##### Example

http://localhost:*****/DoctorEvents/{doctorId}/{dateStart}/{dateFinish}

<a name='M-HoReD-Controllers-DoctorController-GetDoctorEventsForDoctor-System-Int32,System-DateTime,System-DateTime-'></a>
### GetDoctorEventsForDoctor(doctorId,dateStart,dateFinish) `method` [#](#M-HoReD-Controllers-DoctorController-GetDoctorEventsForDoctor-System-Int32,System-DateTime,System-DateTime- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Similar to GetDoctorEvents, but also returns id and name of user, that has session in relevant event

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| doctorId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') |  |
| dateStart | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') |  |
| dateFinish | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') |  |

<a name='M-HoReD-Controllers-DoctorController-GetDoctorGeneralSalaryStatistics-System-Int32,System-DateTime,System-DateTime-'></a>
### GetDoctorGeneralSalaryStatistics(doctorId,dateStart,dateFinish) `method` [#](#M-HoReD-Controllers-DoctorController-GetDoctorGeneralSalaryStatistics-System-Int32,System-DateTime,System-DateTime- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get doctor's general salary statistics in specific range of time

##### Returns

Instance of the class SalaryStatistics

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| doctorId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') |  |
| dateStart | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') |  |
| dateFinish | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') |  |

##### Example

http://localhost:*****/DoctorGeneralSalaryStatistics/{doctorId}/{dateStart}/{dateFinish}

<a name='M-HoReD-Controllers-DoctorController-GetDoctors'></a>
### GetDoctors() `method` [#](#M-HoReD-Controllers-DoctorController-GetDoctors 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets full information about Doctors in database

##### Returns

List of instances of the class DoctorInfo

##### Parameters

This method has no parameters.

##### Example

http://localhost:*****/api/Doctor/

<a name='M-HoReD-Controllers-DoctorController-GetDoctorSalaryStatistics-System-Int32,System-DateTime,System-DateTime-'></a>
### GetDoctorSalaryStatistics(doctorId,dateStart,dateFinish) `method` [#](#M-HoReD-Controllers-DoctorController-GetDoctorSalaryStatistics-System-Int32,System-DateTime,System-DateTime- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get doctor's salary statistics in specific range of time for each day

##### Returns

List of instances of the class SalaryStatistics

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| doctorId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') |  |
| dateStart | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') |  |
| dateFinish | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') |  |

##### Example

http://localhost:*****/DoctorSalaryStatistics/{doctorId}/{dateStart}/{dateFinish}

<a name='M-HoReD-Controllers-DoctorController-GetDoctorsByProfession-System-Int32-'></a>
### GetDoctorsByProfession(professionId) `method` [#](#M-HoReD-Controllers-DoctorController-GetDoctorsByProfession-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns all doctors' ID, name and surname with current profession ID

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| professionId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') |  |

<a name='T-HoReD-Controllers-DoctorScheduleController'></a>
## DoctorScheduleController [#](#T-HoReD-Controllers-DoctorScheduleController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Controller that represents information about doctors schedule

<a name='M-HoReD-Controllers-DoctorScheduleController-GetDoctorSchedule-System-Int32-'></a>
### GetDoctorSchedule() `method` [#](#M-HoReD-Controllers-DoctorScheduleController-GetDoctorSchedule-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets doctor's schedule from database

##### Returns

List of instances of the worcing hour of Doctor

##### Parameters

This method has no parameters.

##### Example

http://localhost:*****/GetDoctorSchedule/{doctorId}

<a name='T-HoReD-Areas-HelpPage-Controllers-HelpController'></a>
## HelpController [#](#T-HoReD-Areas-HelpPage-Controllers-HelpController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage.Controllers

##### Summary

The controller that will handle requests for the help page.

<a name='T-HoReD-Areas-HelpPage-Models-HelpPageApiModel'></a>
## HelpPageApiModel [#](#T-HoReD-Areas-HelpPage-Models-HelpPageApiModel 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage.Models

##### Summary

The model that represents an API displayed on the help page.

<a name='M-HoReD-Areas-HelpPage-Models-HelpPageApiModel-#ctor'></a>
### #ctor() `constructor` [#](#M-HoReD-Areas-HelpPage-Models-HelpPageApiModel-#ctor 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Initializes a new instance of the [HelpPageApiModel](#T-HoReD-Areas-HelpPage-Models-HelpPageApiModel 'HoReD.Areas.HelpPage.Models.HelpPageApiModel') class.

##### Parameters

This constructor has no parameters.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ApiDescription'></a>
### ApiDescription `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ApiDescription 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets or sets the [ApiDescription](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ApiDescription 'HoReD.Areas.HelpPage.Models.HelpPageApiModel.ApiDescription') that describes the API.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ErrorMessages'></a>
### ErrorMessages `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ErrorMessages 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the error messages associated with this model.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestBodyParameters'></a>
### RequestBodyParameters `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestBodyParameters 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the request body parameter descriptions.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestDocumentation'></a>
### RequestDocumentation `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestDocumentation 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets or sets the documentation for the request.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestModelDescription'></a>
### RequestModelDescription `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-RequestModelDescription 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets or sets the [ModelDescription](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescription 'HoReD.Areas.HelpPage.ModelDescriptions.ModelDescription') that describes the request body.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ResourceDescription'></a>
### ResourceDescription `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ResourceDescription 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets or sets the [ModelDescription](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescription 'HoReD.Areas.HelpPage.ModelDescriptions.ModelDescription') that describes the resource.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ResourceProperties'></a>
### ResourceProperties `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-ResourceProperties 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the resource property descriptions.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-SampleRequests'></a>
### SampleRequests `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-SampleRequests 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the sample requests associated with the API.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-SampleResponses'></a>
### SampleResponses `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-SampleResponses 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the sample responses associated with the API.

<a name='P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-UriParameters'></a>
### UriParameters `property` [#](#P-HoReD-Areas-HelpPage-Models-HelpPageApiModel-UriParameters 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets or sets the [ParameterDescription](#T-HoReD-Areas-HelpPage-ModelDescriptions-ParameterDescription 'HoReD.Areas.HelpPage.ModelDescriptions.ParameterDescription') collection that describes the URI parameters for the API.

<a name='T-HoReD-Areas-HelpPage-HelpPageConfig'></a>
## HelpPageConfig [#](#T-HoReD-Areas-HelpPage-HelpPageConfig 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

Use this class to customize the Help Page. For example you can set a custom [IDocumentationProvider](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.IDocumentationProvider 'System.Web.Http.Description.IDocumentationProvider') to supply the documentation or you can provide the samples for the requests/responses.

<a name='T-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions'></a>
## HelpPageConfigurationExtensions [#](#T-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetHelpPageApiModel-System-Web-Http-HttpConfiguration,System-String-'></a>
### GetHelpPageApiModel(config,apiDescriptionId) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetHelpPageApiModel-System-Web-Http-HttpConfiguration,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the model that represents an API displayed on the help page. The model is initialized on the first call and cached for subsequent calls.

##### Returns

An [HelpPageApiModel](#T-HoReD-Areas-HelpPage-Models-HelpPageApiModel 'HoReD.Areas.HelpPage.Models.HelpPageApiModel')

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| apiDescriptionId | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') ID. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetHelpPageSampleGenerator-System-Web-Http-HttpConfiguration-'></a>
### GetHelpPageSampleGenerator(config) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetHelpPageSampleGenerator-System-Web-Http-HttpConfiguration- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the help page sample generator.

##### Returns

The help page sample generator.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetModelDescriptionGenerator-System-Web-Http-HttpConfiguration-'></a>
### GetModelDescriptionGenerator(config) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-GetModelDescriptionGenerator-System-Web-Http-HttpConfiguration- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the model description generator.

##### Returns

The [ModelDescriptionGenerator](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescriptionGenerator 'HoReD.Areas.HelpPage.ModelDescriptions.ModelDescriptionGenerator')

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The configuration. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualRequestType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String-'></a>
### SetActualRequestType(config,type,controllerName,actionName) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualRequestType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Specifies the actual type of [ObjectContent\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.ObjectContent`1 'System.Net.Http.ObjectContent`1') passed to the [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') in an action. The help page will use this information to produce more accurate request samples.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualRequestType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String,System-String[]-'></a>
### SetActualRequestType(config,type,controllerName,actionName,parameterNames) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualRequestType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String,System-String[]- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Specifies the actual type of [ObjectContent\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.ObjectContent`1 'System.Net.Http.ObjectContent`1') passed to the [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') in an action. The help page will use this information to produce more accurate request samples.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.String[]](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String[] 'System.String[]') | The parameter names. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualResponseType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String-'></a>
### SetActualResponseType(config,type,controllerName,actionName) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualResponseType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Specifies the actual type of [ObjectContent\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.ObjectContent`1 'System.Net.Http.ObjectContent`1') returned as part of the [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') in an action. The help page will use this information to produce more accurate response samples.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualResponseType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String,System-String[]-'></a>
### SetActualResponseType(config,type,controllerName,actionName,parameterNames) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetActualResponseType-System-Web-Http-HttpConfiguration,System-Type,System-String,System-String,System-String[]- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Specifies the actual type of [ObjectContent\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.ObjectContent`1 'System.Net.Http.ObjectContent`1') returned as part of the [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') in an action. The help page will use this information to produce more accurate response samples.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.String[]](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String[] 'System.String[]') | The parameter names. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetDocumentationProvider-System-Web-Http-HttpConfiguration,System-Web-Http-Description-IDocumentationProvider-'></a>
### SetDocumentationProvider(config,documentationProvider) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetDocumentationProvider-System-Web-Http-HttpConfiguration,System-Web-Http-Description-IDocumentationProvider- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the documentation provider for help page.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| documentationProvider | [System.Web.Http.Description.IDocumentationProvider](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.IDocumentationProvider 'System.Web.Http.Description.IDocumentationProvider') | The documentation provider. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetHelpPageSampleGenerator-System-Web-Http-HttpConfiguration,HoReD-Areas-HelpPage-HelpPageSampleGenerator-'></a>
### SetHelpPageSampleGenerator(config,sampleGenerator) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetHelpPageSampleGenerator-System-Web-Http-HttpConfiguration,HoReD-Areas-HelpPage-HelpPageSampleGenerator- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the help page sample generator.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sampleGenerator | [HoReD.Areas.HelpPage.HelpPageSampleGenerator](#T-HoReD-Areas-HelpPage-HelpPageSampleGenerator 'HoReD.Areas.HelpPage.HelpPageSampleGenerator') | The help page sample generator. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleForMediaType-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue-'></a>
### SetSampleForMediaType(config,sample,mediaType) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleForMediaType-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the sample directly for all actions with the specified media type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sample | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The sample. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleForType-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-Type-'></a>
### SetSampleForType(config,sample,mediaType,type) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleForType-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-Type- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the sample directly for all actions with the specified type and media type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sample | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The sample. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The parameter type or return type of an action. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleObjects-System-Web-Http-HttpConfiguration,System-Collections-Generic-IDictionary{System-Type,System-Object}-'></a>
### SetSampleObjects(config,sampleObjects) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleObjects-System-Web-Http-HttpConfiguration,System-Collections-Generic-IDictionary{System-Type,System-Object}- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the objects that will be used by the formatters to produce sample requests/responses.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sampleObjects | [System.Collections.Generic.IDictionary{System.Type,System.Object}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IDictionary 'System.Collections.Generic.IDictionary{System.Type,System.Object}') | The sample objects. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleRequest-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String-'></a>
### SetSampleRequest(config,sample,mediaType,controllerName,actionName) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleRequest-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the sample request directly for the specified media type and action.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sample | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The sample request. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleRequest-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String,System-String[]-'></a>
### SetSampleRequest(config,sample,mediaType,controllerName,actionName,parameterNames) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleRequest-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String,System-String[]- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the sample request directly for the specified media type and action with parameters.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sample | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The sample request. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.String[]](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String[] 'System.String[]') | The parameter names. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleResponse-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String-'></a>
### SetSampleResponse(config,sample,mediaType,controllerName,actionName) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleResponse-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the sample request directly for the specified media type of the action.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sample | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The sample response. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |

<a name='M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleResponse-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String,System-String[]-'></a>
### SetSampleResponse(config,sample,mediaType,controllerName,actionName,parameterNames) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageConfigurationExtensions-SetSampleResponse-System-Web-Http-HttpConfiguration,System-Object,System-Net-Http-Headers-MediaTypeHeaderValue,System-String,System-String,System-String[]- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sets the sample response directly for the specified media type of the action with specific parameters.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | [System.Web.Http.HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration') | The [HttpConfiguration](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.HttpConfiguration 'System.Web.Http.HttpConfiguration'). |
| sample | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The sample response. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.String[]](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String[] 'System.String[]') | The parameter names. |

<a name='T-HoReD-Areas-HelpPage-HelpPageSampleGenerator'></a>
## HelpPageSampleGenerator [#](#T-HoReD-Areas-HelpPage-HelpPageSampleGenerator 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

This class will generate the samples for the help page.

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-#ctor'></a>
### #ctor() `constructor` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-#ctor 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Initializes a new instance of the [HelpPageSampleGenerator](#T-HoReD-Areas-HelpPage-HelpPageSampleGenerator 'HoReD.Areas.HelpPage.HelpPageSampleGenerator') class.

##### Parameters

This constructor has no parameters.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActionSamples'></a>
### ActionSamples `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActionSamples 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the objects that are used directly as samples for certain actions.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActualHttpMessageTypes'></a>
### ActualHttpMessageTypes `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActualHttpMessageTypes 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets CLR types that are used as the content of [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') or [HttpResponseMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpResponseMessage 'System.Net.Http.HttpResponseMessage').

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjectFactories'></a>
### SampleObjectFactories `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjectFactories 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets factories for the objects that the supported formatters will serialize as samples. Processed in order, stopping when the factory successfully returns a non- object.

##### Remarks

Collection includes just [GenerateObject](#M-HoReD-Areas-HelpPage-ObjectGenerator-GenerateObject-System-Type- 'HoReD.Areas.HelpPage.ObjectGenerator.GenerateObject(System.Type)') initially. Use

```
SampleObjectFactories.Insert(0, func)
```

to provide an override and

```
SampleObjectFactories.Add(func)
```

to provide a fallback.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjects'></a>
### SampleObjects `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjects 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the objects that are serialized as samples by the supported formatters.

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetActionSample-System-String,System-String,System-Collections-Generic-IEnumerable{System-String},System-Type,System-Net-Http-Formatting-MediaTypeFormatter,System-Net-Http-Headers-MediaTypeHeaderValue,HoReD-Areas-HelpPage-SampleDirection-'></a>
### GetActionSample(controllerName,actionName,parameterNames,type,formatter,mediaType,sampleDirection) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetActionSample-System-String,System-String,System-Collections-Generic-IEnumerable{System-String},System-Type,System-Net-Http-Formatting-MediaTypeFormatter,System-Net-Http-Headers-MediaTypeHeaderValue,HoReD-Areas-HelpPage-SampleDirection- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Search for samples that are provided directly through [ActionSamples](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ActionSamples 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.ActionSamples').

##### Returns

The sample that matches the parameters.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.Collections.Generic.IEnumerable{System.String}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable 'System.Collections.Generic.IEnumerable{System.String}') | The parameter names. |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The CLR type. |
| formatter | [System.Net.Http.Formatting.MediaTypeFormatter](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Formatting.MediaTypeFormatter 'System.Net.Http.Formatting.MediaTypeFormatter') | The formatter. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| sampleDirection | [HoReD.Areas.HelpPage.SampleDirection](#T-HoReD-Areas-HelpPage-SampleDirection 'HoReD.Areas.HelpPage.SampleDirection') | The value indicating whether the sample is for a request or for a response. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSample-System-Web-Http-Description-ApiDescription,HoReD-Areas-HelpPage-SampleDirection-'></a>
### GetSample(api,sampleDirection) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSample-System-Web-Http-Description-ApiDescription,HoReD-Areas-HelpPage-SampleDirection- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the request or response body samples.

##### Returns

The samples keyed by media type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| api | [System.Web.Http.Description.ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). |
| sampleDirection | [HoReD.Areas.HelpPage.SampleDirection](#T-HoReD-Areas-HelpPage-SampleDirection 'HoReD.Areas.HelpPage.SampleDirection') | The value indicating whether the sample is for a request or for a response. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleObject-System-Type-'></a>
### GetSampleObject(type) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleObject-System-Type- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the sample object that will be serialized by the formatters. First, it will look at the [SampleObjects](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjects 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.SampleObjects'). If no sample object is found, it will try to create one using [DefaultSampleObjectFactory](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-DefaultSampleObjectFactory-HoReD-Areas-HelpPage-HelpPageSampleGenerator,System-Type- 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.DefaultSampleObjectFactory(HoReD.Areas.HelpPage.HelpPageSampleGenerator,System.Type)') (which wraps an [ObjectGenerator](#T-HoReD-Areas-HelpPage-ObjectGenerator 'HoReD.Areas.HelpPage.ObjectGenerator')) and other factories in [SampleObjectFactories](#P-HoReD-Areas-HelpPage-HelpPageSampleGenerator-SampleObjectFactories 'HoReD.Areas.HelpPage.HelpPageSampleGenerator.SampleObjectFactories').

##### Returns

The sample object.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleRequests-System-Web-Http-Description-ApiDescription-'></a>
### GetSampleRequests(api) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleRequests-System-Web-Http-Description-ApiDescription- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the request body samples for a given [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription').

##### Returns

The samples keyed by media type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| api | [System.Web.Http.Description.ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleResponses-System-Web-Http-Description-ApiDescription-'></a>
### GetSampleResponses(api) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-GetSampleResponses-System-Web-Http-Description-ApiDescription- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the response body samples for a given [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription').

##### Returns

The samples keyed by media type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| api | [System.Web.Http.Description.ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ResolveHttpRequestMessageType-System-Web-Http-Description-ApiDescription-'></a>
### ResolveHttpRequestMessageType(api) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ResolveHttpRequestMessageType-System-Web-Http-Description-ApiDescription- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Resolves the actual type of [ObjectContent\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.ObjectContent`1 'System.Net.Http.ObjectContent`1') passed to the [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') in an action.

##### Returns

The type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| api | [System.Web.Http.Description.ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ResolveType-System-Web-Http-Description-ApiDescription,System-String,System-String,System-Collections-Generic-IEnumerable{System-String},HoReD-Areas-HelpPage-SampleDirection,System-Collections-ObjectModel-Collection{System-Net-Http-Formatting-MediaTypeFormatter}@-'></a>
### ResolveType(api,controllerName,actionName,parameterNames,sampleDirection,formatters) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-ResolveType-System-Web-Http-Description-ApiDescription,System-String,System-String,System-Collections-Generic-IEnumerable{System-String},HoReD-Areas-HelpPage-SampleDirection,System-Collections-ObjectModel-Collection{System-Net-Http-Formatting-MediaTypeFormatter}@- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Resolves the type of the action parameter or return value when [HttpRequestMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpRequestMessage 'System.Net.Http.HttpRequestMessage') or [HttpResponseMessage](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.HttpResponseMessage 'System.Net.Http.HttpResponseMessage') is used.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| api | [System.Web.Http.Description.ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription') | The [ApiDescription](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.ApiDescription 'System.Web.Http.Description.ApiDescription'). |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.Collections.Generic.IEnumerable{System.String}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable 'System.Collections.Generic.IEnumerable{System.String}') | The parameter names. |
| sampleDirection | [HoReD.Areas.HelpPage.SampleDirection](#T-HoReD-Areas-HelpPage-SampleDirection 'HoReD.Areas.HelpPage.SampleDirection') | The value indicating whether the sample is for a request or a response. |
| formatters | [System.Collections.ObjectModel.Collection{System.Net.Http.Formatting.MediaTypeFormatter}@](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.ObjectModel.Collection 'System.Collections.ObjectModel.Collection{System.Net.Http.Formatting.MediaTypeFormatter}@') | The formatters. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-WriteSampleObjectUsingFormatter-System-Net-Http-Formatting-MediaTypeFormatter,System-Object,System-Type,System-Net-Http-Headers-MediaTypeHeaderValue-'></a>
### WriteSampleObjectUsingFormatter(formatter,value,type,mediaType) `method` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleGenerator-WriteSampleObjectUsingFormatter-System-Net-Http-Formatting-MediaTypeFormatter,System-Object,System-Type,System-Net-Http-Headers-MediaTypeHeaderValue- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Writes the sample object using formatter.

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| formatter | [System.Net.Http.Formatting.MediaTypeFormatter](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Formatting.MediaTypeFormatter 'System.Net.Http.Formatting.MediaTypeFormatter') | The formatter. |
| value | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The value. |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | Type of the media. |

<a name='T-HoReD-Areas-HelpPage-HelpPageSampleKey'></a>
## HelpPageSampleKey [#](#T-HoReD-Areas-HelpPage-HelpPageSampleKey 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

This is used to identify the place where the sample should be applied.

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue-'></a>
### #ctor(mediaType) `constructor` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Creates a new [HelpPageSampleKey](#T-HoReD-Areas-HelpPage-HelpPageSampleKey 'HoReD.Areas.HelpPage.HelpPageSampleKey') based on media type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue,System-Type-'></a>
### #ctor(mediaType,type) `constructor` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue,System-Type- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Creates a new [HelpPageSampleKey](#T-HoReD-Areas-HelpPage-HelpPageSampleKey 'HoReD.Areas.HelpPage.HelpPageSampleKey') based on media type and CLR type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The CLR type. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-HoReD-Areas-HelpPage-SampleDirection,System-String,System-String,System-Collections-Generic-IEnumerable{System-String}-'></a>
### #ctor(sampleDirection,controllerName,actionName,parameterNames) `constructor` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-HoReD-Areas-HelpPage-SampleDirection,System-String,System-String,System-Collections-Generic-IEnumerable{System-String}- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Creates a new [HelpPageSampleKey](#T-HoReD-Areas-HelpPage-HelpPageSampleKey 'HoReD.Areas.HelpPage.HelpPageSampleKey') based on [SampleDirection](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'HoReD.Areas.HelpPage.HelpPageSampleKey.SampleDirection'), controller name, action name and parameter names.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sampleDirection | [HoReD.Areas.HelpPage.SampleDirection](#T-HoReD-Areas-HelpPage-SampleDirection 'HoReD.Areas.HelpPage.SampleDirection') | The [SampleDirection](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'HoReD.Areas.HelpPage.HelpPageSampleKey.SampleDirection'). |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.Collections.Generic.IEnumerable{System.String}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable 'System.Collections.Generic.IEnumerable{System.String}') | The parameter names. |

<a name='M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue,HoReD-Areas-HelpPage-SampleDirection,System-String,System-String,System-Collections-Generic-IEnumerable{System-String}-'></a>
### #ctor(mediaType,sampleDirection,controllerName,actionName,parameterNames) `constructor` [#](#M-HoReD-Areas-HelpPage-HelpPageSampleKey-#ctor-System-Net-Http-Headers-MediaTypeHeaderValue,HoReD-Areas-HelpPage-SampleDirection,System-String,System-String,System-Collections-Generic-IEnumerable{System-String}- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Creates a new [HelpPageSampleKey](#T-HoReD-Areas-HelpPage-HelpPageSampleKey 'HoReD.Areas.HelpPage.HelpPageSampleKey') based on media type, [SampleDirection](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'HoReD.Areas.HelpPage.HelpPageSampleKey.SampleDirection'), controller name, action name and parameter names.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| mediaType | [System.Net.Http.Headers.MediaTypeHeaderValue](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Net.Http.Headers.MediaTypeHeaderValue 'System.Net.Http.Headers.MediaTypeHeaderValue') | The media type. |
| sampleDirection | [HoReD.Areas.HelpPage.SampleDirection](#T-HoReD-Areas-HelpPage-SampleDirection 'HoReD.Areas.HelpPage.SampleDirection') | The [SampleDirection](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'HoReD.Areas.HelpPage.HelpPageSampleKey.SampleDirection'). |
| controllerName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the controller. |
| actionName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Name of the action. |
| parameterNames | [System.Collections.Generic.IEnumerable{System.String}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable 'System.Collections.Generic.IEnumerable{System.String}') | The parameter names. |

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleKey-ActionName'></a>
### ActionName `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-ActionName 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the name of the action.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleKey-ControllerName'></a>
### ControllerName `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-ControllerName 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the name of the controller.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleKey-MediaType'></a>
### MediaType `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-MediaType 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the media type.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleKey-ParameterNames'></a>
### ParameterNames `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-ParameterNames 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the parameter names.

<a name='P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection'></a>
### SampleDirection `property` [#](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets the [SampleDirection](#P-HoReD-Areas-HelpPage-HelpPageSampleKey-SampleDirection 'HoReD.Areas.HelpPage.HelpPageSampleKey.SampleDirection').

<a name='T-HoReD-Areas-HelpPage-ImageSample'></a>
## ImageSample [#](#T-HoReD-Areas-HelpPage-ImageSample 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

This represents an image sample on the help page. There's a display template named ImageSample associated with this class.

<a name='M-HoReD-Areas-HelpPage-ImageSample-#ctor-System-String-'></a>
### #ctor(src) `constructor` [#](#M-HoReD-Areas-HelpPage-ImageSample-#ctor-System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Initializes a new instance of the [ImageSample](#T-HoReD-Areas-HelpPage-ImageSample 'HoReD.Areas.HelpPage.ImageSample') class.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| src | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The URL of an image. |

<a name='T-HoReD-Areas-HelpPage-InvalidSample'></a>
## InvalidSample [#](#T-HoReD-Areas-HelpPage-InvalidSample 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

This represents an invalid sample on the help page. There's a display template named InvalidSample associated with this class.

<a name='T-HoReD-Controllers-LoginController'></a>
## LoginController [#](#T-HoReD-Controllers-LoginController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Manages the logining process of users

<a name='M-HoReD-Controllers-LoginController-LoginUser-HoReD-Models-LoginUserBindingModel-'></a>
### LoginUser(model) `method` [#](#M-HoReD-Controllers-LoginController-LoginUser-HoReD-Models-LoginUserBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Checks whether entered user data is valid

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.LoginUserBindingModel](#T-HoReD-Models-LoginUserBindingModel 'HoReD.Models.LoginUserBindingModel') |  |

<a name='M-HoReD-Controllers-LoginController-ResetPassword-HoReD-Models-ResetPasswordBindingModel-'></a>
### ResetPassword(model) `method` [#](#M-HoReD-Controllers-LoginController-ResetPassword-HoReD-Models-ResetPasswordBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Resets password after validation link, email address and new password

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.ResetPasswordBindingModel](#T-HoReD-Models-ResetPasswordBindingModel 'HoReD.Models.ResetPasswordBindingModel') | Email, new password and link for resetting from email |

##### Example

http://localhost:*****/ResetPassword

<a name='M-HoReD-Controllers-LoginController-SendEmailForResettingPassword-HoReD-Models-LoginUserBindingModel-'></a>
### SendEmailForResettingPassword(model) `method` [#](#M-HoReD-Controllers-LoginController-SendEmailForResettingPassword-HoReD-Models-LoginUserBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Sends email with uniquely generated link that have expiration time to provide ability reset password

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.LoginUserBindingModel](#T-HoReD-Models-LoginUserBindingModel 'HoReD.Models.LoginUserBindingModel') | Email address where send link to |

##### Example

http://localhost:*****/SendEmailForResettingPassword

<a name='T-HoReD-Controllers-MedicalCardController'></a>
## MedicalCardController [#](#T-HoReD-Controllers-MedicalCardController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Controller that represents information about patient medical card

<a name='M-HoReD-Controllers-MedicalCardController-GetMedicalCardByPatientId-System-Int32,System-Int32,System-Int32,System-Int32-'></a>
### GetMedicalCardByPatientId(userId,pageNumber,elementOnPageCount,columnNumber) `method` [#](#M-HoReD-Controllers-MedicalCardController-GetMedicalCardByPatientId-System-Int32,System-Int32,System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Method that get user id and return his medical card

##### Returns

Array of records

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| userId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |
| pageNumber | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Index of page |
| elementOnPageCount | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Total amount of records on one page |
| columnNumber | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Amount of column on page |

<a name='M-HoReD-Controllers-MedicalCardController-GetPageCount-System-Int32,System-Int32-'></a>
### GetPageCount(userId,elementOnPageCount) `method` [#](#M-HoReD-Controllers-MedicalCardController-GetPageCount-System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns Total amount of needed pages with {elementOnPageCount} to display all medical card data

##### Returns

Total page amount

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| userId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |
| elementOnPageCount | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Amount of records displayed on one page |

<a name='T-HoReD-Controllers-MembershipController'></a>
## MembershipController [#](#T-HoReD-Controllers-MembershipController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

<a name='M-HoReD-Controllers-MembershipController-Authenticate-HoReD-Models-LoginUserBindingModel-'></a>
### Authenticate(loginInfo) `method` [#](#M-HoReD-Controllers-MembershipController-Authenticate-HoReD-Models-LoginUserBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Verify user data

##### Returns

If data correct - 200 status code which contain access token, else returns 401 status code

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| loginInfo | [HoReD.Models.LoginUserBindingModel](#T-HoReD-Models-LoginUserBindingModel 'HoReD.Models.LoginUserBindingModel') | Gets user email and password |

<a name='T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescription'></a>
## ModelDescription [#](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescription 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage.ModelDescriptions

##### Summary

Describes a type model.

<a name='T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescriptionGenerator'></a>
## ModelDescriptionGenerator [#](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescriptionGenerator 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage.ModelDescriptions

##### Summary

Generates model descriptions for given types.

<a name='T-HoReD-Areas-HelpPage-ModelDescriptions-ModelNameAttribute'></a>
## ModelNameAttribute [#](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelNameAttribute 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage.ModelDescriptions

##### Summary

Use this attribute to change the name of the [ModelDescription](#T-HoReD-Areas-HelpPage-ModelDescriptions-ModelDescription 'HoReD.Areas.HelpPage.ModelDescriptions.ModelDescription') generated for a type.

<a name='T-HoReD-Areas-HelpPage-ObjectGenerator'></a>
## ObjectGenerator [#](#T-HoReD-Areas-HelpPage-ObjectGenerator 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

This class will create an object of a given type and populate it with sample data.

<a name='M-HoReD-Areas-HelpPage-ObjectGenerator-GenerateObject-System-Type-'></a>
### GenerateObject(type) `method` [#](#M-HoReD-Areas-HelpPage-ObjectGenerator-GenerateObject-System-Type- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Generates an object for a given type. The type needs to be public, have a public default constructor and settable public properties/fields. Currently it supports the following types: Simple types: [Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32'), [String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String'), [Enum](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Enum 'System.Enum'), [DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime'), [Uri](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Uri 'System.Uri'), etc. Complex types: POCO types. Nullables: [Nullable\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Nullable`1 'System.Nullable`1'). Arrays: arrays of simple types or complex types. Key value pairs: [KeyValuePair\`2](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.KeyValuePair`2 'System.Collections.Generic.KeyValuePair`2') Tuples: [Tuple\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Tuple`1 'System.Tuple`1'), [Tuple\`2](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Tuple`2 'System.Tuple`2'), etc Dictionaries: [IDictionary\`2](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IDictionary`2 'System.Collections.Generic.IDictionary`2') or anything deriving from [IDictionary\`2](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IDictionary`2 'System.Collections.Generic.IDictionary`2'). Collections: [IList\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IList`1 'System.Collections.Generic.IList`1'), [IEnumerable\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable`1 'System.Collections.Generic.IEnumerable`1'), [ICollection\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.ICollection`1 'System.Collections.Generic.ICollection`1'), [IList](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.IList 'System.Collections.IList'), [IEnumerable](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.IEnumerable 'System.Collections.IEnumerable'), [ICollection](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.ICollection 'System.Collections.ICollection') or anything deriving from [ICollection\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.ICollection`1 'System.Collections.Generic.ICollection`1') or [IList](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.IList 'System.Collections.IList'). Queryables: [IQueryable](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Linq.IQueryable 'System.Linq.IQueryable'), [IQueryable\`1](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Linq.IQueryable`1 'System.Linq.IQueryable`1').

##### Returns

An object of the given type.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| type | [System.Type](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Type 'System.Type') | The type. |

<a name='T-HoReD-Controllers-PatientDataController'></a>
## PatientDataController [#](#T-HoReD-Controllers-PatientDataController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Controller that represents information about patient medical card

<a name='M-HoReD-Controllers-PatientDataController-AddMedicalRecord-HoReD-Models-MedicalRecordBindingModel-'></a>
### AddMedicalRecord(model) `method` [#](#M-HoReD-Controllers-PatientDataController-AddMedicalRecord-HoReD-Models-MedicalRecordBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Adds description and treatment for visit

##### Returns

Integer: 1 - if record added

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.MedicalRecordBindingModel](#T-HoReD-Models-MedicalRecordBindingModel 'HoReD.Models.MedicalRecordBindingModel') | Id patient, starttime of visit, description and treatment |

<a name='M-HoReD-Controllers-PatientDataController-AddPatientAllergy-HoReD-Models-MedicalRecordBindingModel-'></a>
### AddPatientAllergy(model) `method` [#](#M-HoReD-Controllers-PatientDataController-AddPatientAllergy-HoReD-Models-MedicalRecordBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Adds allergies for patient

##### Returns

Integer: 1 - if allergy added

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.MedicalRecordBindingModel](#T-HoReD-Models-MedicalRecordBindingModel 'HoReD.Models.MedicalRecordBindingModel') | Id patient, starttime of visit and idallergy |

<a name='M-HoReD-Controllers-PatientDataController-AddPatientDisease-HoReD-Models-MedicalRecordBindingModel-'></a>
### AddPatientDisease(model) `method` [#](#M-HoReD-Controllers-PatientDataController-AddPatientDisease-HoReD-Models-MedicalRecordBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Adds disease for patient

##### Returns

Integer: 1 - if disease added

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.MedicalRecordBindingModel](#T-HoReD-Models-MedicalRecordBindingModel 'HoReD.Models.MedicalRecordBindingModel') | Id patient, starttime of visit and iddisease |

<a name='M-HoReD-Controllers-PatientDataController-ClosePatientAllergy-HoReD-Models-MedicalRecordBindingModel-'></a>
### ClosePatientAllergy(model) `method` [#](#M-HoReD-Controllers-PatientDataController-ClosePatientAllergy-HoReD-Models-MedicalRecordBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Closes allergy for patient

##### Returns

Integer: 1 - if allergy closed

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.MedicalRecordBindingModel](#T-HoReD-Models-MedicalRecordBindingModel 'HoReD.Models.MedicalRecordBindingModel') | Id patient, starttime of visit and iddallergy |

<a name='M-HoReD-Controllers-PatientDataController-ClosePatientDisease-HoReD-Models-MedicalRecordBindingModel-'></a>
### ClosePatientDisease(model) `method` [#](#M-HoReD-Controllers-PatientDataController-ClosePatientDisease-HoReD-Models-MedicalRecordBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Closes disease for patient

##### Returns

Integer: 1 - if disease closed

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.MedicalRecordBindingModel](#T-HoReD-Models-MedicalRecordBindingModel 'HoReD.Models.MedicalRecordBindingModel') | Id patient, starttime of visit and iddisease |

<a name='M-HoReD-Controllers-PatientDataController-GetActiveAllergyInfo-System-Int32,System-Int32-'></a>
### GetActiveAllergyInfo(idPatient,idAllergy) `method` [#](#M-HoReD-Controllers-PatientDataController-GetActiveAllergyInfo-System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get description, treatment, doctor and date for active allergy

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idPatient | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |
| idAllergy | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed allergy |

<a name='M-HoReD-Controllers-PatientDataController-GetCategories'></a>
### GetCategories() `method` [#](#M-HoReD-Controllers-PatientDataController-GetCategories 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns diseases categories

##### Returns

List of diseases categories id, name

##### Parameters

This method has no parameters.

<a name='M-HoReD-Controllers-PatientDataController-GetClosedAllergiesInfo-System-Int32-'></a>
### GetClosedAllergiesInfo(idPatient) `method` [#](#M-HoReD-Controllers-PatientDataController-GetClosedAllergiesInfo-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get description, treatment, doctor and date for the opening and closing allergy visits

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idPatient | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-PatientDataController-GetClosedDiseaseInfo-System-Int32-'></a>
### GetClosedDiseaseInfo(idPatient) `method` [#](#M-HoReD-Controllers-PatientDataController-GetClosedDiseaseInfo-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get description, treatment, doctor and date for diagnose

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idPatient | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-PatientDataController-GetDiagnoseInfo-System-Int32,System-Int32-'></a>
### GetDiagnoseInfo(idPatient,idDisease) `method` [#](#M-HoReD-Controllers-PatientDataController-GetDiagnoseInfo-System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get description, treatment, doctor and date for diagnose

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idPatient | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |
| idDisease | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed subdisease |

<a name='M-HoReD-Controllers-PatientDataController-GetDiseases-System-Int32-'></a>
### GetDiseases(id) `method` [#](#M-HoReD-Controllers-PatientDataController-GetDiseases-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns diseases diseases, that current subcategory has

##### Returns

List of diseases id, code, name

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed subcategory |

<a name='M-HoReD-Controllers-PatientDataController-GetPatientActiveAllergies-System-Int32-'></a>
### GetPatientActiveAllergies(id) `method` [#](#M-HoReD-Controllers-PatientDataController-GetPatientActiveAllergies-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns active allergies, that current user has

##### Returns

List of user's allergies names, id and visit

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-PatientDataController-GetPatientActiveDiseases-System-Int32-'></a>
### GetPatientActiveDiseases(id) `method` [#](#M-HoReD-Controllers-PatientDataController-GetPatientActiveDiseases-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns active diseases, that current user has

##### Returns

List of user's diseases names, id

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-PatientDataController-GetPatientDataByPatientId-System-Int32-'></a>
### GetPatientDataByPatientId(id) `method` [#](#M-HoReD-Controllers-PatientDataController-GetPatientDataByPatientId-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Method that get user id and return his medical card

##### Returns

Patient Data

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-PatientDataController-GetPatientDiseases-System-Int32,System-Int32-'></a>
### GetPatientDiseases(idPatient,idDisease) `method` [#](#M-HoReD-Controllers-PatientDataController-GetPatientDiseases-System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns all subdiseases, that current user don't has

##### Returns

List of user's nonactive subdiseases

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idPatient | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |
| idDisease | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed subdisease |

<a name='M-HoReD-Controllers-PatientDataController-GetPatientNoNActiveAllergies-System-Int32-'></a>
### GetPatientNoNActiveAllergies(id) `method` [#](#M-HoReD-Controllers-PatientDataController-GetPatientNoNActiveAllergies-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns active allergies, that current user don't has

##### Returns

List of user's allergies names, id

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-PatientDataController-GetSubCategories-System-Int32-'></a>
### GetSubCategories(id) `method` [#](#M-HoReD-Controllers-PatientDataController-GetSubCategories-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns diseases subcategories, that current category has

##### Returns

List of diseases subcategories, id, firstcode, lastcode, name

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed category |

<a name='T-HoReD-Controllers-RegistrationController'></a>
## RegistrationController [#](#T-HoReD-Controllers-RegistrationController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Adds information to database during registration and manages users' activation

<a name='M-HoReD-Controllers-RegistrationController-ActivateUser-System-String-'></a>
### ActivateUser(IdUser) `method` [#](#M-HoReD-Controllers-RegistrationController-ActivateUser-System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Activates user, that visited own activation link

##### Returns

Integer: 0 - if user already activated, 1 - if activation succeeded, -1 - if such user doesn't exist in database

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| IdUser | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | ID of the needed user |

<a name='M-HoReD-Controllers-RegistrationController-CreateNewUser-HoReD-Models-RegistrationBindingModel-'></a>
### CreateNewUser(model) `method` [#](#M-HoReD-Controllers-RegistrationController-CreateNewUser-HoReD-Models-RegistrationBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Adds to system information about new user

##### Returns

Status code

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.RegistrationBindingModel](#T-HoReD-Models-RegistrationBindingModel 'HoReD.Models.RegistrationBindingModel') | Information about user |

<a name='T-HoReD-Controllers-RuleController'></a>
## RuleController [#](#T-HoReD-Controllers-RuleController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

<a name='M-HoReD-Controllers-RuleController-AddOrUpdate-HoReD-Models-RuleBindingModel-'></a>
### AddOrUpdate(model) `method` [#](#M-HoReD-Controllers-RuleController-AddOrUpdate-HoReD-Models-RuleBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Adds new rule into database, or update existing based on ID

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.RuleBindingModel](#T-HoReD-Models-RuleBindingModel 'HoReD.Models.RuleBindingModel') | Rule |

<a name='M-HoReD-Controllers-RuleController-AssignDoctorToRule-HoReD-Models-RulesetBindingModel-'></a>
### AssignDoctorToRule(model) `method` [#](#M-HoReD-Controllers-RuleController-AssignDoctorToRule-HoReD-Models-RulesetBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Assigns doctor with ID {IdDoctor} to rule with ID {IdRule}

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.RulesetBindingModel](#T-HoReD-Models-RulesetBindingModel 'HoReD.Models.RulesetBindingModel') | Stores IDs of doctor and rule |

<a name='M-HoReD-Controllers-RuleController-Delete-System-Int32-'></a>
### Delete(IdRule) `method` [#](#M-HoReD-Controllers-RuleController-Delete-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Deletes rule with current ID

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| IdRule | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of rule, that should be deleted |

<a name='M-HoReD-Controllers-RuleController-Delete-HoReD-Models-RulesetBindingModel-'></a>
### Delete(model) `method` [#](#M-HoReD-Controllers-RuleController-Delete-HoReD-Models-RulesetBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Dismisses doctor with ID {IdDoctor} from rule with ID {IdRule}

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.RulesetBindingModel](#T-HoReD-Models-RulesetBindingModel 'HoReD.Models.RulesetBindingModel') | Stores IDs of doctor and rule |

<a name='M-HoReD-Controllers-RuleController-GetDoctorsBYIdRule-System-Int32,System-Boolean-'></a>
### GetDoctorsBYIdRule(IdRule,hasRule) `method` [#](#M-HoReD-Controllers-RuleController-GetDoctorsBYIdRule-System-Int32,System-Boolean- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Returns all doctors that has or has not rule with ID {IdRule} based on {hasRule}

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| IdRule | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed rule |
| hasRule | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean 'System.Boolean') | Defines to return doctors that has or has not |

<a name='T-HoReD-Controllers-SalaryController'></a>
## SalaryController [#](#T-HoReD-Controllers-SalaryController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Controller manages salary management

<a name='M-HoReD-Controllers-SalaryController-#ctor-Entities-Services-ISalaryService-'></a>
### #ctor() `constructor` [#](#M-HoReD-Controllers-SalaryController-#ctor-Entities-Services-ISalaryService- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Constructor for SalaryController

##### Parameters

This constructor has no parameters.

<a name='M-HoReD-Controllers-SalaryController-AddNewCoeff-HoReD-Models-SalaryCoeffBindingModel-'></a>
### AddNewCoeff(model) `method` [#](#M-HoReD-Controllers-SalaryController-AddNewCoeff-HoReD-Models-SalaryCoeffBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Add some coeff defined by the end-user by assigned doctorId and startDate

##### Returns

Status code: 0 - something went wrong, 1 - successful

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.SalaryCoeffBindingModel](#T-HoReD-Models-SalaryCoeffBindingModel 'HoReD.Models.SalaryCoeffBindingModel') | Binding model that contains doctorId, coeff and startDate |

##### Example

http://localhost:*****/api/Salary/Coefficient/add

<a name='M-HoReD-Controllers-SalaryController-AddNewRate-HoReD-Models-SalaryRateBindingModel-'></a>
### AddNewRate(model) `method` [#](#M-HoReD-Controllers-SalaryController-AddNewRate-HoReD-Models-SalaryRateBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Add some rate defined by the end-user by assigned professionId and startDate

##### Returns

Status code: 0 - something went wrong, 1 - successful

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.SalaryRateBindingModel](#T-HoReD-Models-SalaryRateBindingModel 'HoReD.Models.SalaryRateBindingModel') | Binding model that contains professionId, rate and startDate |

##### Example

http://localhost:*****/api/Salary/Rate/add

<a name='M-HoReD-Controllers-SalaryController-DeleteCoeff-System-Int32,System-String,System-Int32-'></a>
### DeleteCoeff(doctorId,startDate) `method` [#](#M-HoReD-Controllers-SalaryController-DeleteCoeff-System-Int32,System-String,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Delete some rate by assigned doctorId and startDate

##### Returns

Status code: 0 - something went wrong, 1 - successful

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| doctorId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Doctor id |
| startDate | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The start date of rate |

##### Example

http://localhost:*****/api/Salary/Rate/delet/{doctorId}/{startDate}

<a name='M-HoReD-Controllers-SalaryController-DeleteRate-System-Int32,System-String,System-Int32-'></a>
### DeleteRate(professionId,startDate) `method` [#](#M-HoReD-Controllers-SalaryController-DeleteRate-System-Int32,System-String,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Delete some rate by assigned professionId and startDate

##### Returns

Status code: 0 - something went wrong, 1 - successful

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| professionId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Profession id |
| startDate | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The start date of rate |

##### Example

http://localhost:*****/api/Salary/Rate/delete/{professionId}/{startDate}

<a name='M-HoReD-Controllers-SalaryController-EditNewCoeff-HoReD-Models-SalaryCoeffBindingModel-'></a>
### EditNewCoeff(model) `method` [#](#M-HoReD-Controllers-SalaryController-EditNewCoeff-HoReD-Models-SalaryCoeffBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Edit some coeff defined by the end-user by assigned doctorId and startDate

##### Returns

Status code: 0 - something went wrong, 1 - successful

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.SalaryCoeffBindingModel](#T-HoReD-Models-SalaryCoeffBindingModel 'HoReD.Models.SalaryCoeffBindingModel') | Binding model that contains doctorId, rate and startDate |

##### Example

http://localhost:*****/api/Salary/Coefficient/edit

<a name='M-HoReD-Controllers-SalaryController-EditNewRate-HoReD-Models-SalaryRateBindingModel-'></a>
### EditNewRate(model) `method` [#](#M-HoReD-Controllers-SalaryController-EditNewRate-HoReD-Models-SalaryRateBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Edit some rate defined by the end-user by assigned professionId and startDate

##### Returns

Status code: 0 - something went wrong, 1 - successful

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.SalaryRateBindingModel](#T-HoReD-Models-SalaryRateBindingModel 'HoReD.Models.SalaryRateBindingModel') | Binding model that contains professionId, rate and startDate |

##### Example

http://localhost:*****/api/Salary/Rate/edit

<a name='M-HoReD-Controllers-SalaryController-GetCoefficientsForDoctor-System-Int32-'></a>
### GetCoefficientsForDoctor(doctorId) `method` [#](#M-HoReD-Controllers-SalaryController-GetCoefficientsForDoctor-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets all coefficients for some doctor by its id

##### Returns

List of instances of the class SalaryRate (Rate, StartDate, State)

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| doctorId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Doctor id |

##### Example

http://localhost:*****/api/Salary/Rate/get/{doctorId}

<a name='M-HoReD-Controllers-SalaryController-GetRatesForProfession-System-Int32-'></a>
### GetRatesForProfession(professionId) `method` [#](#M-HoReD-Controllers-SalaryController-GetRatesForProfession-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets all rates for some profession by its id

##### Returns

List of instances of the class SalaryRate (Rate, StartDate, State)

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| professionId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Profession id |

##### Example

http://localhost:*****/api/Salary/Rate/get/{professionId}

<a name='T-HoReD-Areas-HelpPage-SampleDirection'></a>
## SampleDirection [#](#T-HoReD-Areas-HelpPage-SampleDirection 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

Indicates whether the sample is used for request or response

<a name='T-HoReD-Controllers-ScheduleController'></a>
## ScheduleController [#](#T-HoReD-Controllers-ScheduleController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Controller manages schedules

<a name='M-HoReD-Controllers-ScheduleController-InsertNewScheduleRecord-HoReD-Models-ScheduleBindingModel-'></a>
### InsertNewScheduleRecord(model) `method` [#](#M-HoReD-Controllers-ScheduleController-InsertNewScheduleRecord-HoReD-Models-ScheduleBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Inserts new schedule record into database

##### Returns

Status code

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.ScheduleBindingModel](#T-HoReD-Models-ScheduleBindingModel 'HoReD.Models.ScheduleBindingModel') | Stores data about schedule(start time, end time and IDs of doctor and patient |

<a name='T-HoReD-App_Start-SimpleInjectorWebApiInitializer'></a>
## SimpleInjectorWebApiInitializer [#](#T-HoReD-App_Start-SimpleInjectorWebApiInitializer 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.App_Start

<a name='M-HoReD-App_Start-SimpleInjectorWebApiInitializer-Initialize'></a>
### Initialize() `method` [#](#M-HoReD-App_Start-SimpleInjectorWebApiInitializer-Initialize 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Initialize the container and register it as Web API Dependency Resolver.

##### Parameters

This method has no parameters.

<a name='T-HoReD-Areas-HelpPage-TextSample'></a>
## TextSample [#](#T-HoReD-Areas-HelpPage-TextSample 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

This represents a preformatted text sample on the help page. There's a display template named TextSample associated with this class.

<a name='T-HoReD-Controllers-UserController'></a>
## UserController [#](#T-HoReD-Controllers-UserController 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Controllers

##### Summary

Manages general User data

<a name='M-HoReD-Controllers-UserController-ChangeRole-System-Int32,System-Int32,System-Int32,System-Int32-'></a>
### ChangeRole(currentUser,userId,role,idProffesion) `method` [#](#M-HoReD-Controllers-UserController-ChangeRole-System-Int32,System-Int32,System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Change of user role(from doctor to admin etc)

##### Returns

Update role for one user

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| currentUser | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | current User Id for logging info |
| userId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | UserId |
| role | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Role |
| idProffesion | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | idProffesion(unnecessary param) |

<a name='M-HoReD-Controllers-UserController-EditUserInfo-HoReD-Models-UserInfoBindingModel-'></a>
### EditUserInfo(model) `method` [#](#M-HoReD-Controllers-UserController-EditUserInfo-HoReD-Models-UserInfoBindingModel- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Edits record in database with general info

##### Returns



##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| model | [HoReD.Models.UserInfoBindingModel](#T-HoReD-Models-UserInfoBindingModel 'HoReD.Models.UserInfoBindingModel') |  |

<a name='M-HoReD-Controllers-UserController-FilterAllUsers-System-Int32,System-Int32,System-Boolean,System-Boolean,System-String-'></a>
### FilterAllUsers(numberPage,countInPage,isAdmin,isDoctor,firstOrlastname) `method` [#](#M-HoReD-Controllers-UserController-FilterAllUsers-System-Int32,System-Int32,System-Boolean,System-Boolean,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Get filtered info about users first and lastname,isAdmin,profession

##### Returns

List of filtered info about users-first and lastname,isAdmin,profession

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numberPage | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Number of page |
| countInPage | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Users count in page |
| isAdmin | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean 'System.Boolean') | isAdmin |
| isDoctor | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean 'System.Boolean') | isDoctor |
| firstOrlastname | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | firstOrlastname(unnecessary param) |

<a name='M-HoReD-Controllers-UserController-GetInfoAboutAllUsers-System-Int32,System-Int32-'></a>
### GetInfoAboutAllUsers(numberPage,countInPage) `method` [#](#M-HoReD-Controllers-UserController-GetInfoAboutAllUsers-System-Int32,System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets info about role-doctor,user or admin

##### Returns

List of users-first and lastname,isAdmin,profession

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numberPage | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Number of page |
| countInPage | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Users count in page |

<a name='M-HoReD-Controllers-UserController-GetUserAvailableRole-System-Int32-'></a>
### GetUserAvailableRole(idUser) `method` [#](#M-HoReD-Controllers-UserController-GetUserAvailableRole-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Available role for user

##### Returns

List idRole,rolename

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idUser | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | idUser |

<a name='M-HoReD-Controllers-UserController-GetUserInfoById-System-Int32-'></a>
### GetUserInfoById(UserInfoId) `method` [#](#M-HoReD-Controllers-UserController-GetUserInfoById-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Gets all general info about user

##### Returns

UserInfo

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserInfoId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | ID of needed user |

<a name='M-HoReD-Controllers-UserController-GetUserRole-System-Int32-'></a>
### GetUserRole(idUser) `method` [#](#M-HoReD-Controllers-UserController-GetUserRole-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Current role of user

##### Returns

List firsname,lastname,rolename

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| idUser | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | idUser |

<a name='M-HoReD-Controllers-UserController-ListFirstLastname-System-String-'></a>
### ListFirstLastname(text) `method` [#](#M-HoReD-Controllers-UserController-ListFirstLastname-System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

List first and lastname of users for filtering

##### Returns

List first and lastnameof users

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | text for searching |

<a name='M-HoReD-Controllers-UserController-NumbersOfPage-System-Int32-'></a>
### NumbersOfPage(countInPage) `method` [#](#M-HoReD-Controllers-UserController-NumbersOfPage-System-Int32- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Count of pages for different quantity of users on the page

##### Returns

Count of pages(for pagination)

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| countInPage | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | Users count in page |

<a name='M-HoReD-Controllers-UserController-NumbersOfPageFiltered-System-Int32,System-Boolean,System-Boolean,System-String-'></a>
### NumbersOfPageFiltered(countInPage,isAdmin,isDoctor,firstOrlastname) `method` [#](#M-HoReD-Controllers-UserController-NumbersOfPageFiltered-System-Int32,System-Boolean,System-Boolean,System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Count of pages for different quantity of users on the page

##### Returns

Count of pages(for pagination)

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| countInPage | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | User's count in page |
| isAdmin | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean 'System.Boolean') | isAdmin |
| isDoctor | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean 'System.Boolean') | isDoctor |
| firstOrlastname | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | firstOrlastname(unnecessary param) |

<a name='T-HoReD-Areas-HelpPage-XmlDocumentationProvider'></a>
## XmlDocumentationProvider [#](#T-HoReD-Areas-HelpPage-XmlDocumentationProvider 'Go To Here') [=](#contents 'Back To Contents')

##### Namespace

HoReD.Areas.HelpPage

##### Summary

A custom [IDocumentationProvider](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Web.Http.Description.IDocumentationProvider 'System.Web.Http.Description.IDocumentationProvider') that reads the API documentation from an XML documentation file.

<a name='M-HoReD-Areas-HelpPage-XmlDocumentationProvider-#ctor-System-String-'></a>
### #ctor(documentPath) `constructor` [#](#M-HoReD-Areas-HelpPage-XmlDocumentationProvider-#ctor-System-String- 'Go To Here') [=](#contents 'Back To Contents')

##### Summary

Initializes a new instance of the [XmlDocumentationProvider](#T-HoReD-Areas-HelpPage-XmlDocumentationProvider 'HoReD.Areas.HelpPage.XmlDocumentationProvider') class.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| documentPath | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The physical path to XML document. |
