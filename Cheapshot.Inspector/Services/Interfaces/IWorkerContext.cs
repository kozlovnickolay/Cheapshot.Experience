using System;
using Cheapshot.Exprience.Data.Model;


namespace Cheapshot.Inspector.Services.Interfaces {
    public interface IWorkerContext {
        CityEntity[] GetAllCities();
        Guid InsertOrUpdateUser(UserEntity user);
        Guid InsertXpData(ExperienceEntity xp);

    }

}
