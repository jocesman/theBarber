import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUsers";

let users: IUser[] = [];

const id: string = "1234";


export const createUserServices = async (userData: UserDto): Promise<IUser> => {
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado

    const newUser: IUser = {
        id,
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhone: userData.userPhone
    }

    users.push(newUser);
    return newUser;
}

export const getUserServices = async (): Promise<IUser[]> => {
    return users;
}

export const deleteUserServices = async (id: string): Promise<void> => {
    users = users.filter((user) => {
        return user.id !== id;
    })
}