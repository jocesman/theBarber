import { AppDataSource } from "../config/data-source";
import { appointment1, appointment2, appointment3, appointment4, appointment5, appointment6, appointment7, appointment8, appointment9, appointment10 } from "./appointmetLoadData";
import { user1, accessControl1, user2, accessControl2, user3, accessControl3, user4, accessControl4, user5, accessControl5, user6, accessControl6 } from "./usersLoadData";


export const preLoadData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        
        await transactionalEntityManager.save(accessControl1);
        await transactionalEntityManager.save(user1);
        await transactionalEntityManager.save(accessControl2);
        await transactionalEntityManager.save(user2);
        await transactionalEntityManager.save(accessControl3);
        await transactionalEntityManager.save(user3);
        await transactionalEntityManager.save(accessControl4);
        await transactionalEntityManager.save(user4);
        await transactionalEntityManager.save(accessControl5);
        await transactionalEntityManager.save(user5);
        await transactionalEntityManager.save(accessControl6);
        await transactionalEntityManager.save(user6);
        await transactionalEntityManager.save(appointment1);
        await transactionalEntityManager.save(appointment2);
        await transactionalEntityManager.save(appointment3);
        await transactionalEntityManager.save(appointment4);
        await transactionalEntityManager.save(appointment5);
        await transactionalEntityManager.save(appointment6);
        await transactionalEntityManager.save(appointment7);
        await transactionalEntityManager.save(appointment8);
        await transactionalEntityManager.save(appointment9);
        await transactionalEntityManager.save(appointment10);

        
    
        console.log("Precargados los datos de prueba con éxito");
     
    });
}
