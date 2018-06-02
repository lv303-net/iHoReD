using System;
using System.Data;
using System.Collections.Generic;

namespace Entities.Services
{
    public static class CommandExtensions
    {
        public static void AddParameter(this IDbCommand command, string name, object value)
        {
            if (command == null) throw new ArgumentNullException("command");
            if (name == null) throw new ArgumentNullException("name");
            var p = command.CreateParameter();
            p.ParameterName = name;
            p.Value = value ?? DBNull.Value;
            command.Parameters.Add(p);
        }

        public static void SetCurrentUser(this IDbContext command, int idUser)
        {
            const string cmd = "SET_CURRENT_USER";
            var param = new Dictionary<string, object>()
            {
                {"@USER_ID", idUser}
            };
            command.ExecuteSqlQuery(cmd, param);
        }
    }
}
