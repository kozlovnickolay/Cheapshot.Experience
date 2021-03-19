using System;
using System.Linq;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using Cheapshot.Inspector.Services.Interfaces;

namespace Cheapshot.Inspector.Services {
    public class WorkerContext : IWorkerContext {
        private readonly CitiesRepository m_cities;
        private readonly UsersRepository m_users;
        private readonly ExperienceRepository m_exps;

        public WorkerContext(CitiesRepository cities, UsersRepository users, ExperienceRepository exps) {
            m_cities = cities;
            m_users = users;
            m_exps = exps;
        }

        public IQueryable<UserEntity> GetAllUsers() {
            return m_users.GetAll();
        }

        public CityEntity[] GetAllCities() {
            return m_cities.GetAll().ToArray();
        }

        public Guid InsertOrUpdateUser(UserEntity userEntity) {
            var user = m_users.GetById(userEntity.Id);
            if (user == null) {
                var id = m_users.Add(userEntity);
                m_users.SaveChanges();
                return id;
            } else {
                if (userEntity.Name != user.Name || userEntity.Level != user.Level || userEntity.UserPic != user.UserPic) {
                    user.Name = userEntity.Name;
                    user.Level = userEntity.Level;
                    user.UserPic = userEntity.UserPic;
                    m_users.Update(user);
                    m_users.SaveChanges();
                }
                return user.Id;
            }
        }

        public Guid InsertXpData(ExperienceEntity xp) {
            var id = m_exps.Add(xp);
            m_exps.SaveChanges();
            return id;
        }

        public void InsertRangeUsers(UserEntity[] users) {
            m_users.AddRange(users);
            m_users.SaveChanges();
        }

        public void InsertRangeExperience(ExperienceEntity[] exps) {
            m_exps.AddRange(exps);
            m_exps.SaveChanges();
        }

        public void UpdateRangeUsers(UserEntity[] users) {
            m_users.UpdateRange(users);
            m_users.SaveChanges();
        }
    }
}