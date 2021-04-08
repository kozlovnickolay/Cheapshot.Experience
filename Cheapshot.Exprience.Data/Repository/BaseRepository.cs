using Cheapshot.Exprience.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Cheapshot.Exprience.Data.Repository {
    public class BaseRepository<TEntity> : IDbRepository<TEntity> where TEntity : class, IEntity {
        public readonly DataContext m_dc;

        public BaseRepository() {
        }

        public BaseRepository(DataContext context) {
            m_dc = context;
        }

        public Guid Add(TEntity newEntity) {
            var entity = m_dc.Set<TEntity>().Add(newEntity);
            return entity.Entity.Id;
        }

        public void AddRange(IEnumerable<TEntity> newEntities) {
            m_dc.Set<TEntity>().AddRange(newEntities);
        }

        public IQueryable Get(Expression<Func<TEntity, bool>> selector) {
            return m_dc.Set<TEntity>().Where(selector).AsQueryable();
        }

        public IQueryable<TEntity> GetAll() {
            return m_dc.Set<TEntity>().AsQueryable();
        }

        public TEntity GetById(Guid id) {
            return m_dc.Set<TEntity>().Where(x => x.Id == id).FirstOrDefault();
        }

        public void Remove(TEntity entity) {
            m_dc.Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities) {
            m_dc.RemoveRange(entities);
        }

        public int SaveChanges() {
            return m_dc.SaveChanges();
        }

        public void Update(TEntity entity) {
            m_dc.Update(entity);
        }

        public void UpdateRange(IEnumerable<TEntity> entities) {
            m_dc.UpdateRange(entities);
        }

        public void ExecuteSqlRaw(string sql) {
            m_dc.Database.ExecuteSqlRaw(sql);
        }
    }
}
