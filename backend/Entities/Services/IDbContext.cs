using System;
using System.Collections.Generic;

namespace Entities.Services
{
    public interface IDbContext
    {
        string ExecuteSqlQuery(string cmd, char separatedChar, Dictionary<string, object> param);

        void ExecuteSqlQuery(string cmd, IDictionary<string, object> data);
    }
}
