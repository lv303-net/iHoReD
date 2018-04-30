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
            var command = new SqlCommand(cmd, _myConnection);
            var reader = command.ExecuteReader();
            var result = new StringBuilder();
            if (reader.Read())
            {
                foreach (var value in reader)
                {
                    result.Append(value);
                    result.Append(separatedChar);
                }
            }

            return result.ToString();
        }

        public void ExecuteSqlQuery(string cmd, IDictionary<string, object> data) { }

        public int ExecuteSqlQuery(string cmd, string outparam, IDictionary<string, object> data)
        {
            throw new System.NotImplementedException();
        }
    }
}
