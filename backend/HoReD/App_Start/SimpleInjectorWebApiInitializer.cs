[assembly: WebActivator.PostApplicationStartMethod(typeof(HoReD.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace HoReD.App_Start
{
    using System.Web.Http;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;
    using SimpleInjector.Lifestyles;
    using Entities.Services;

    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>Initialize the container and register it as Web API Dependency Resolver.</summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            
            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
       
            container.Verify();
            
            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }
     
        private static void InitializeContainer(Container container)
        {
            container.Register<IUserService, UserService>(Lifestyle.Scoped);
            container.Register<IDbContext, DbContext>(Lifestyle.Scoped);
            container.Register<IDoctorService, DoctorService>(Lifestyle.Scoped);
            container.Register<IScheduleService, ScheduleService>(Lifestyle.Scoped);
            container.Register<IRuleService, RuleService>(Lifestyle.Scoped); 
            container.Register<IMedicalCardService, MedicalCardService>(Lifestyle.Scoped);
            container.Register<IPatientDataService, PatientDataService>(Lifestyle.Scoped);
            container.Register<ISalaryService, SalaryService>(Lifestyle.Scoped);
            container.Register<IAuthService, AuthService>(Lifestyle.Scoped);
            container.Register<IMembershipProvider, MembershipProvider>(Lifestyle.Scoped);
            container.Register<IRSAKeyProvider, RSAKeyProvider>(Lifestyle.Scoped);
            // For instance:
            // container.Register<IUserRepository, SqlUserRepository>(Lifestyle.Scoped);
        }
    }
}