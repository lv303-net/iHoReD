using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Text;

namespace Entities.Services
{
    class FakeDbContext: IDbContext
    {
        private readonly SqlConnection _myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["MyConString"].ConnectionString);

        public FakeDbContext()
        {
        }

        //Execute query, which return one string, where values separated by char
        public string ExecuteSqlQuery(string cmd, char separatedChar, Dictionary<string, object> param)
        {
            return "1***1*67*2018-04-30T09:00:00*4*A00.0*2***1*67*2018-04-30T09:00:00*5*A00.0";
        }

        public void ExecuteSqlQuery(string cmd, IDictionary<string, object> data) { }

        public int ExecuteSqlQuery(string cmd, string outparam, IDictionary<string, object> data)
        {
            throw new System.NotImplementedException();
        }

        public int ExecuteQuery(string cmd, IDictionary<string, object> data)
        {
            throw new System.NotImplementedException();
        }

        public void ExecuteSqlQueryWithCheckingChanges(string cmd, IDictionary<string, object> data)
        {
            throw new System.NotImplementedException();
        }
    }
}
