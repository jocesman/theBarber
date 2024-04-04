import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUsers";

let users: IUser[] = [];

const id: number = 1234;


export const createUserServices = async (userData: UserDto): Promise<IUser> => {
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado

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

export const getUserServices = async (): Promise<IUser[]> => {
    return users;
}

export const deleteUserServices = async (id: number): Promise<void> => {
    users = users.filter((user: IUser) => {
        return user.id !== id;
    })
}