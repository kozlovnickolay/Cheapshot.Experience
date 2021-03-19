using Cheapshot.Exprience.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Cheapshot.Exprience.Data.Repository {
    public class ExperienceRepository : BaseRepository<ExperienceEntity> {

        public ExperienceRepository(DataContext context) : base(context) {
        }


    }
}
