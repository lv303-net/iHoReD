using System;

namespace Entities
{
    class Card
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int Height { get; set; }

        public int Weight { get; set; }

        public bool Sex { get; set; }

        public int BloodType { get; set; }

        public bool ReactFactor { get; set; }
    }
}
