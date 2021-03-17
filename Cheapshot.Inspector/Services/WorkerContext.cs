using System;
using System.Linq;
using Cheapshot.Exprience.Data.Model;
using Cheapshot.Exprience.Data.Repository;
using Cheapshot.Inspector.Services.Interfaces;

namespace Cheapshot.Inspector.Services {
    public class WorkerContext : IWorkerContext {
        private readonly IDbRepository m_dbRepository;

        public WorkerContext(IDbRepository dbRepository) {
            m_dbRepository = dbRepository;
        }

        public CityEntity[] GetAllCities() {
            return m_dbRepository.GetAll<CityEntity>().ToArray();
        }

        public Guid InsertOrUpdateUser(UserEntity userEntity) {


            var user = m_dbRepository.Get<UserEntity>().FirstOrDefault(x => x.UserId == userEntity.UserId);
            if (user == null) {
                var id = m_dbRepository.Add(userEntity);
                m_dbRepository.SaveChanges();
                return id;
            } else {
                if (userEntity.Name != user.Name || userEntity.Level != user.Level || userEntity.UserPic != user.UserPic) {
                    user.Name = userEntity.Name;
                    user.Level = userEntity.Level;
                    user.UserPic = userEntity.UserPic;
                    m_dbRepository.Update(user);
                    m_dbRepository.SaveChanges();
                }
                return user.Id;
            }


        }

        public Guid InsertXpData(ExperienceEntity xp) {
            var id = m_dbRepository.Add(xp);
            m_dbRepository.SaveChanges();
            return id;
        }
    }
}