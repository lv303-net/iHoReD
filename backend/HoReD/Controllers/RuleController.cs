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
        public IHttpActionResult GetRules()
        {
            try
            {
                return Ok(_ruleService.GetRules());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Adds new rule into database, or update existing based on ID
        /// </summary>
        /// <param name="model">Rule</param>
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

        /// <summary>
        /// Deletes rule with current ID
        /// </summary>
        /// <param name="IdRule">ID of rule, that should be deleted</param>
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

        /// <summary>
        /// Dismisses doctor with ID {IdDoctor} from rule with ID {IdRule}
        /// </summary>
        /// <param name="model">Stores IDs of doctor and rule</param>
        [HttpPost]
        [Route("Rule/{IdRule}/DoctorHasRule/{IdDoctor}/Dismiss")]
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
        /// <summary>
        /// Assigns doctor with ID {IdDoctor} to rule with ID {IdRule}
        /// </summary>
        /// <param name="model">Stores IDs of doctor and rule</param>
        [HttpPost]
        [Route("Rule/{IdRule}/DoctorHasRule/false/{IdDoctor}/Assign")]
        public void AssignDoctorToRule(Models.RulesetBindingModel model)
        {
            try
            {
                _ruleService.AssignDoctorToRule(model.IdRule, model.IdDoctor);
            }
            catch (Exception e)
            {
                string message = e.Message;
            }
        }

        /// <summary>
        /// Returns all doctors that has or has not rule with ID {IdRule} based on {hasRule}
        /// </summary>
        /// <param name="IdRule">ID of needed rule</param>
        /// <param name="hasRule">Defines to return doctors that has or has not</param>
        /// <returns></returns>
        [HttpGet]
        [Route("Rule/{IdRule}/DoctorHasRule/{hasRule=true}")]
        public IHttpActionResult GetDoctorsBYIdRule(int IdRule, bool hasRule)
        {
            try
            {
                return Ok(_ruleService.GetDoctorsByIdRule(IdRule, hasRule));
            }
            catch (Exception e)
            {
                string message = e.Message;
                return null;
            }
        }
    }
}
