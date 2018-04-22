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
        [Route("Rule")]
        public List<DoctorRules> GetRules()
        {
            try
            {
                return _ruleService.GetRules();
            }
            catch (Exception e)
            {
                string message = e.Message;
                return null;
            }
        }

        [HttpPost]
        [Route("Rule/{IdRule}")]
        public void AddOrUpdate(Models.RuleBindingModel model)
        {
            try
            {
                DoctorRules rule = new DoctorRules()
                {
                    IdRule = model.IdRule,
                    RuleName = model.RuleName,
                    HourStart = model.HourStart,
                    HourFinish = model.HourFinish,
                    PeriodStart = model.PeriodStart,
                    PeriodFinish = model.PeriodFinish,
                    IfInclusive = model.IfInclusive,
                    Week = model.Week                
                };
                _ruleService.AddOrUpdateRule(rule);
            }
            catch (Exception e)
            {
                string message = e.Message;
            }
        }

        [HttpPost]
        [Route("Rule/{IdRule}/Delete")]
        public void Delete(int IdRule)
        {
            try
            {
                _ruleService.DeleteRule(IdRule);
            }
            catch (Exception e)
            {
                string message = e.Message;
            }
        }

        [HttpPost]
        [Route("Rule/{IdRule}/Doctors/{IdDoctor}/Dismiss")]
        public void Delete(Models.RulesetBindingModel model)
        {
            try
            {
                _ruleService.DismissDoctorFromRule(model.IdRule, model.IdDoctor);
            }
            catch (Exception e)
            {
                string message = e.Message;
            }
        }

        [HttpGet]
        [Route("Rule/{IdRule}/Doctors")]
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
