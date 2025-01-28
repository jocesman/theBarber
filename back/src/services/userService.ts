import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/Users";
import UserRepository from "../repositories/UserRepositry";

export const createtUserService = async (userData: Users): Promise<Users> => { 
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

    // const user:Users = await AppDataSource.getRepository(Users).create(userData);
    const user:Users = await UserRepository.create(userData);
    // await AppDataSource.getRepository(Users).save(user);
    await UserRepository.save(user);
    return user;
};


export const getUserService = async(): Promise<Users[]> => {
    const users: Users[] = await AppDataSource.getRepository(Users).find({
        relations: ["accessControl", "appointments"]
    })
    return users;
 };

 export const getUserByPhoneService = async(phone: string): Promise<Users | null> => {
    const user: Users | null = await AppDataSource.getRepository(Users).findOne({ 
        where: { userPhone: phone }, 
        relations: {
            accessControl: true,
            appointments: true
        }
    });
    if (!user) return null;
    else return user;
 };
    
export const deleteUserService = async(phone: string) => {
    return await AppDataSource.getRepository(Users).delete({ userPhone: phone });
};

export const modifyUserService = async(phone: string, userData: Users): Promise<Users | null> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        let user = await queryRunner.manager.findOne(Users, { where: { userPhone: phone } });
        console.log(user);
        console.log(userData);
        if (!user) {
            throw new Error("No se encontró ningún usuario con ese número de teléfono");
        } else {
            userData.userPhone = phone;
            await queryRunner.manager.update(Users, {userPhone: phone},userData);
            user = await queryRunner.manager.findOne(Users, { where: { userPhone: phone } });
            await queryRunner.commitTransaction();
            return user;
        }    
    } catch (error) {
        await queryRunner.rollbackTransaction();
        return null;
    } finally {
        await queryRunner.release();
    }
};
