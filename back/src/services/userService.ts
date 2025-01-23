import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/Users";
import UserDto from "../dto/UserDto";
import IUser from "../interfaces/IUser";
import { AccessControl } from "../entities/AccessControl";
import AccessDto from "../dto/AccessDto";

let userss: IUser[] = [];

export const createtUserService = async (userData: UserDto) => { 
    // recibir los datos del usuario
    // crear el usuario
    // incluir el usuario en el arreglo temporal || en la base de datos
    // retornar el usuario

    // const newUser: IUser = {
    //     userPhone: userData.userPhone,
    //     userName: userData.userName,
    //     userLastName: userData.userLastName,
    //     userId: userData.userId,
    //     userEmail: userData.userEmail,
    //     userAddress: userData.userAddress,
    //     userCity: userData.userCity,
    //     userDateCreated: userData.userDateCreated,
    //     userStatus: "active",
    //     userTypeUser: userData.userTypeUser
    // };

    // userss.push(newUser);

    // return newUser;

    const user = await AppDataSource.getRepository(Users).create(userData);
    await AppDataSource.getRepository(Users).save(user);
    
    return user;
};


export const getUserService = async()  => {
    const users = await AppDataSource.getRepository(Users).find()
    return users;
 };

 export const getUserByPhoneService = async(phone: string) => {
    const user = await AppDataSource.getRepository(Users).findOne({ where: { userPhone: phone } });
    return user;
 };


export const deleteUserService = async(phone: string) => {
    return await AppDataSource.getRepository(Users).delete({ userPhone: phone });
};

export const modifyUserService = async(phone: string, userData: UserDto) => {
    const user = await AppDataSource.getRepository(Users).findOneBy({ userPhone: phone });
    AppDataSource.getRepository(Users).merge(userData);
    const results = await AppDataSource.getRepository(Users).save(userData);
    return user;
};
