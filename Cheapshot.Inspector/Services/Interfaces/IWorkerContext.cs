using System;
using System.Linq;
using Cheapshot.Exprience.Data.Model;

namespace Cheapshot.Inspector.Services.Interfaces {
    public interface IWorkerContext {
        CityEntity[] GetAllCities();
        IQueryable<UserEntity> GetAllUsers();
        Guid InsertOrUpdateUser(UserEntity user);
        void InsertRangeUsers(UserEntity[] users);
        void UpdateRangeUsers(UserEntity[] users);
        Guid InsertXpData(ExperienceEntity xp);
        void InsertRangeExperience(ExperienceEntity[] exps);
        void EqualizeExperience(DateTime date);
    }
}