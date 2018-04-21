using System;
using System.Collections.Generic;
using System.Web.Http;
using Entities;
using Entities.Services;

namespace HoReD.Controllers
{
    public class RuleController : ApiController
    {
        private readonly IRuleService _ruleService;

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }


        [HttpGet]
        [Route("Rules")]
        public List<DoctorRules> GetRules()
        {
            try
            {
                return _ruleService.GetRules();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("Rules/{IdRule}/GetDoctorsByRule")]
        public List<DoctorInfo> GetDoctorsBYIdRule(int IdRule)
        {
            try
            {
                return _ruleService.GetDoctorsByIdRule(IdRule);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
