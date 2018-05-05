using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Services
{
    public interface IMedicalCardService
    {
        List<MedicalCard> GetUserCardById(int userId, int pageNumber, int elementOnPageCount);
    }
}
