using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Entities.Services;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;

namespace HoReD
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            
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

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);


            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest()
        {
            if (Request.Headers.AllKeys.Contains("Origin") && Request.HttpMethod == "OPTIONS")
            {
                Response.Flush();
            }
        }
    }
}
