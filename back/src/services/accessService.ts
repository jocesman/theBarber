import { AppDataSource } from "../config/data-source";
import AccessDto from "../dto/AccessDto";
import { AccessControl } from "../entities/AccessControl";
import { Users } from "../entities/Users";

export const createtAccessService = async (credentials: AccessControl) => {
    const access = await AppDataSource.getRepository(AccessControl).create(credentials);
    await AppDataSource.getRepository(AccessControl).save(access);

    const user = await AppDataSource.getRepository(Users).findOne({ where: { userPhone: access.accessUserPhone } });
    if (!user){
        return null
    } else {
        user.accessControl = access;
        await AppDataSource.getRepository(Users).save(user);
    };
    return access;
};