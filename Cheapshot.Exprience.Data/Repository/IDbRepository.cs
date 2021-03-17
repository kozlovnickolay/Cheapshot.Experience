using Cheapshot.Exprience.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Cheapshot.Exprience.Data.Repository {
    public interface IDbRepository {
        IQueryable<T> Get<T>(Expression<Func<T, bool>> selector) where T : class, IEntity;
        IQueryable<T> Get<T>() where T : class, IEntity;
        IQueryable<T> GetAll<T>() where T : class, IEntity;

        Guid Add<T>(T newEntity) where T : class, IEntity;
        void AddRange<T>(IEnumerable<T> newEntities) where T : class, IEntity;

        void Remove<T>(T entity) where T : class, IEntity;
        void RemoveRange<T>(IEnumerable<T> entities) where T : class, IEntity;

        void Update<T>(T entity) where T : class, IEntity;
        void UpdateRange<T>(IEnumerable<T> entities) where T : class, IEntity;

        int SaveChanges();
    }
}
