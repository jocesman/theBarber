import { AppDataSource } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/Users";
import IUser from "../interfaces/IUsers";

let users: IUser[] = [];

let id: number = 1234;


export const createUserServices = async (userData: UserDto) => {
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

export const getUserById = async (id: number): Promise<IUser[]> => {
    const user: IUser[] = users.filter((user: IUser) => {
        if (user.id === id) return user;        
    });
    return user;
}

export const getUserServices = async () => {
    const users = await AppDataSource.getRepository(User).find();
    return users;
}

export const deleteUserServices = async (id: number): Promise<void> => {
    users = users.filter((user: IUser) => {
        return user.id !== id;
    });
} 

/*
export const getUserServices = async (): Promise<IUser[]> => {
    return users;
}

export const createUserServices = async (userData: UserDto): Promise<IUser> => {
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
*/
