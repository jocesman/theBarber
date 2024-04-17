import { AppDataSource } from "../config/data-source";
import appoRepository from "../repositories/appoRepository";
import userRepository from "../repositories/userRepository";
import credRepository from "../repositories/credRepository";
import { Credential } from "../entities/Credential";
import { User } from "../entities/Users";
import { CrearCredenciales } from "../middlewares/crearCredenciales";
import { error } from "console";

export const getUserServices = async () => {
    return await userRepository.find({
        relations: ['appointment']
    });
}

export const getUserByIdService = async (id: number) => {
    return await userRepository.findOne({
        where: { userId: id },
        relations: ['appointment']
    });
}

export const createUserServices = async (userData: User, credentialParams: Credential) => {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction()
        
        const newUser = new User();
        Object.assign(newUser, userData);
        /*newUser.name = userData.name;
        newUser.email = userData.email;
        newUser.birthdate = userData.birthdate;
        newUser.nDni = userData.nDni;*/

        const credentialId: Credential = await CrearCredenciales(credentialParams);
        newUser.credential = credentialId;

        await queryRunner.manager.save(newUser);
        await queryRunner.commitTransaction();

        return(newUser);
    } catch (error) {        
        await queryRunner.rollbackTransaction()
        return (0);
    } finally {     
        await queryRunner.release()
    }
    
};    

export const deleteUserServices = async (id: number): Promise<boolean> => {
    const queryRunner = AppDataSource.createQueryRunner();
    
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction()

        const credToDelete = await credRepository;
        // Obtener el usuario con sus relaciones cargadas
        const user = await userRepository.findOne({
            where: { userId: id },
            relations: ['appointment', 'credential'] 
        });
        // Verificar si se encontró el usuario
        if (!user) return false;        

        await Promise.all(user.appointment.map(async (appointment) => {
            await appoRepository.delete(appointment);
        }));

        //const idToDeleteCred = user?.credential.credentialId;
        //const cred = await credToDelete.find({where: { credentialId: idToDeleteCred }});
        
        await userRepository.remove(user);
        await credRepository.remove(user.credential);

        await queryRunner.commitTransaction();
        return true;
        
    } catch (error) {
        await queryRunner.rollbackTransaction()
        return false;
    } finally {
        // you need to release query runner which is manually created:       
        await queryRunner.release()
    }
    
}

export const bajaTemporalUserServices = async (id:number): Promise<boolean> => {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const user = await userRepository.findOne({
            where: { userId: id },
            relations: ['credential'] 
        });

        if (!user) return false;

        user.credential.active = false;
        await credRepository.save(user.credential);
        await queryRunner.commitTransaction();
        return true;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        return false;
    } finally {
        await queryRunner.release();
    }
}
    
   