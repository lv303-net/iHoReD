using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface IRuleService
    {
        List<DoctorRules> GetRules();

        List<DoctorInfo> GetDoctorsByIdRule(int IdRule);

        void AddOrUpdateRule(DoctorRules rule);

        void DeleteRule(int IdRule);

        void DismissDoctorFromRule(int IdRule, int IdDoctor);
    }
}
