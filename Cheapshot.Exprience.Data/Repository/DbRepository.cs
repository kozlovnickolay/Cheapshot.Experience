using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Cheapshot.Exprience.Data.Repository {
    public class DbRepository : IDbRepository {
        private readonly DataContext m_dc;

        public DbRepository(DataContext context) {
            m_dc = context;
        }

        public int SaveChanges() {
            return m_dc.SaveChanges();
        }

        Guid IDbRepository.Add<T>(T newEntity) {
            var entity = m_dc.Set<T>().Add(newEntity);
            return entity.Entity.Id;
        }

        void IDbRepository.AddRange<T>(IEnumerable<T> newEntities) {
            m_dc.Set<T>().AddRange(newEntities);
        }

        IQueryable<T> IDbRepository.Get<T>(Expression<Func<T, bool>> selector) {
            return m_dc.Set<T>().Where(selector).AsQueryable();
        }

        IQueryable<T> IDbRepository.Get<T>() {
            return m_dc.Set<T>().AsQueryable();
        }

        IQueryable<T> IDbRepository.GetAll<T>() {
            return m_dc.Set<T>().AsQueryable();
        }

        void IDbRepository.Remove<T>(T entity) {
            m_dc.Set<T>().Remove(entity);
        }

        void IDbRepository.RemoveRange<T>(IEnumerable<T> entities) {
            m_dc.Set<T>().RemoveRange(entities);
        }

        void IDbRepository.Update<T>(T entity) {
            m_dc.Update<T>(entity);
        }

        void IDbRepository.UpdateRange<T>(IEnumerable<T> entities) {
            m_dc.UpdateRange<T>(entities);
        }
    }
}
