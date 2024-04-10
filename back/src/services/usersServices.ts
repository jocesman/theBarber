import { AppDataSource } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/Users";
import IUser from "../interfaces/IUsers";



let users: IUser[] = [];

let id: number = 1234;


export const getUserServices = async () => {
    const users = await AppDataSource.getRepository(User).find({
        relations: {
            appointment: true
        }
    });
    return users;
}

export const createUserServices = async (userData: User) => {

    //const newUser: User = await AppDataSource.setOptions(userData);
    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.birthdate = userData.birthdate;
    newUser.nDni = userData.nDni;
    newUser.credentialId = userData.credentialId;
  
    await AppDataSource.manager.save(newUser);
  
    return(newUser);
};    

export const getUserByIdService = async (id: number) => {
    const userById = await AppDataSource.manager.findOneBy(User, { userId: id });
    return userById;

    /*users.filter((user: IUser) => {
        if (user.id === id) return user;        
    });
    return user*/

    //const newUser = await AppDataSource(userData);
    //await AppDataSource.save(newUser);

    //return console.log('Hello WOrld');
    

}



/*

export const getUserById = async (id: number): Promise<IUser[]> => {
    const user: IUser[] = users.filter((user: IUser) => {
        if (user.id === id) return user;        
    });
    return user

    //const newUser = await AppDataSource(userData);
    //await AppDataSource.save(newUser);

    //return console.log('Hello WOrld');
    

}


export const deleteUserServices = async (id: number): Promise<void> => {
    users = users.filter((user: IUser) => {
        return user.id !== id;
    });
} 
export const createUserServices = async (userData: User) => {
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado
    /*
    id++;
    const newUser: IUser = {
        id,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialId: userData.credentialId
    }

    users.push(newUser);
    return newUser;
}
*/

//export const getUserServices = async (): Promise<IUser[]> => {
//    return users;
//}

/*export const createUserServices = async (userData: UserDto): Promise<IUser> => {
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado
    id++;
    const newUser: IUser = {
        id,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialId: userData.credentialId
    }

    users.push(newUser);
    return newUser;
}
}*/