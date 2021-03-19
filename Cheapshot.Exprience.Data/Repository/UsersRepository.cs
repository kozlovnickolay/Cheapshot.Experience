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
    public class UsersRepository : BaseRepository<UserEntity> {
        public UsersRepository(DataContext context) : base(context) {
        }
    }
}
