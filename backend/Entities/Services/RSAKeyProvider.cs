using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public class RSAKeyProvider : IRSAKeyProvider
    {

        private string rsaKeyPath;

        public RSAKeyProvider()
        {
            rsaKeyPath = AppDomain.CurrentDomain.BaseDirectory + @"RsaUserKey.txt";
        }

        public string GetPrivateAndPublicKeyAsync()
        {
            string result = ReadPrivateAndPublicKeyAsync();
            if (string.IsNullOrEmpty(result))
            {
                string key = CreatePrivateAndPublicKey();
                Boolean isInserted = InsertPrivateAndPublicKeyAsync(key);
                if (isInserted)
                    result = key;
            }

            return result;
        }

        private string CreatePrivateAndPublicKey()
        {
            RSACryptoServiceProvider myRSA = new RSACryptoServiceProvider(2048);
            RSAParameters publicKey = myRSA.ExportParameters(true);
            string publicAndPrivateKey = myRSA.ToXmlString(true);
            return publicAndPrivateKey;
        }

        private bool InsertPrivateAndPublicKeyAsync(string key)
        {
            try
            {
                using (StreamWriter fileStream = new StreamWriter(rsaKeyPath))
                {
                    fileStream.WriteLineAsync(key);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return false;
            }
        }

        private string ReadPrivateAndPublicKeyAsync()
        {
            string result = null;
            try
            {
                using (StreamReader fileStream = new StreamReader(rsaKeyPath))
                {
                    result = fileStream.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }

            return result;
        }
    }
}