import { AppDataSource } from "../config/data-source";
import appoRepository from "../repositories/appoReposiroty";
import userRepository from "../repositories/userRepository";
import credRepository from "../repositories/credRepository";
import { Credential } from "../entities/Credential";
import { User } from "../entities/Users";
import { CrearCredenciales } from "../middlewares/crearCredenciales";
import { Appointment } from "../entities/Appointment";

export const getUserServices = async () => {
    const users = await userRepository.find({
        relations: {
            appointment: true
        }
    });
    return users;
}

export const getUserByIdService = async (id: number) => {
    const users = await userRepository; //AppDataSource.manager.getRepository(User);
    const userById = users.findOne({
        where: {
            userId: id
        },
        relations: {
            appointment: true
        }
    });
    return userById;
}

export const createUserServices = async (userData: User, credentialParams: Credential) => {
    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.birthdate = userData.birthdate;
    newUser.nDni = userData.nDni;
    const credentialId: Credential = await CrearCredenciales(credentialParams);
    
    newUser.credential = credentialId;
    
    await AppDataSource.manager.save(newUser);
  
    return(newUser);
};    

export const deleteUserServices = async (id: number): Promise<boolean> => {
    const userToDelete = await userRepository;
    const credToDelete = await credRepository;
    const turnToDelete = await appoRepository;

    // Obtener el usuario con sus relaciones cargadas
    const user = await userToDelete.findOne({
        where: { userId: id },
        relations: ['appointment', 'credential'] 
    });

    // Verificar si se encontró el usuario
    if (!user) return false;

    await Promise.all(user.appointment.map(async (appointment) => {
        await turnToDelete.delete(appointment);
    }));

    const idToDeleteCred = user?.credential.credentialId;
    

    const cred = await credToDelete.find({where: { credentialId: idToDeleteCred }});
       
    await userToDelete.remove(user);
    await credToDelete.remove(cred);
    
    return true;
}

export const bajaTemporalUserServices = async (id:number): Promise<boolean> => {
    const userDown = await userRepository;
    const credDown = await credRepository;

    const user = await userDown.findOne({
        where: { userId: id },
        relations: ['credential'] 
    });

    if (!user) return false;

    user.credential.active = false;
    await credDown.save(user.credential);

    return true;
}
    
   