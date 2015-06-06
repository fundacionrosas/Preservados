using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Preservados.Web.Models
{
    public class QuestionModel
    {
        public long QuestionID { get; set; }

        public string Title { get; set; }

        public List<string> Questions { get; set; }

        public string Correct { get; set; }

        public string Tips { get; set; }
    }
}