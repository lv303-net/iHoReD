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

        [HttpPost]
        [Route("Rules/{IdRule}")]
        public void AddOrUpdate(Models.RuleBindingModel rule)
        {
            try
            {
                DoctorRules dr = new DoctorRules()
                {
                    IdRule = rule.IdRule,
                    RuleName = rule.RuleName,
                    HourStart = rule.HourStart,
                    HourFinish = rule.HourFinish,
                    PeriodStart = rule.PeriodStart,
                    PeriodFinish = rule.PeriodFinish,
                    IfInclusive = rule.IfInclusive,
                    Week = rule.Week                
                };
                _ruleService.AddOrUpdateRule(dr);
            }
            catch (Exception e)
            {
                string message = e.Message;
            }
        }


        [HttpGet]
        [Route("Rules/DoctorsByRule/{IdRule}")]
        public List<DoctorInfo> GetDoctorsBYIdRule(int IdRule)
        {
            try
            {
                return _ruleService.GetDoctorsByIdRule(IdRule);
            }
            catch (Exception e)
            {
                string message = e.Message;
                return null;
            }
        }
    }
}
