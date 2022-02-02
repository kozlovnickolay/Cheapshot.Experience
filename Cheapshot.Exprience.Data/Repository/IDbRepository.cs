using Cheapshot.Exprience.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Cheapshot.Exprience.Data.Repository {
    public interface IDbRepository<T> {
        IQueryable<T> Get(Expression<Func<T, bool>> selector);
        T GetById(Guid id);
        IQueryable<T> GetAll();

        Guid Add(T newEntity);
        void AddRange(IEnumerable<T> newEntities);

        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);

        void Update(T entity);
        void UpdateRange(IEnumerable<T> entities);

        int SaveChanges();
    }
}
