import { AppDataSource } from "../config/data-source";
import AccessDto from "../dto/AccessDto";
import { AccessControl } from "../entities/AccessControl";
import { Users } from "../entities/Users";
import { encriptar } from "../middlewares/encriptacion";
import { desencriptar } from "../middlewares/encriptacion";

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

export const getAccessService = async (credentials: AccessControl) => {
    const access = await AppDataSource.getRepository(AccessControl).findOne({ where: { accessUserPhone: credentials.accessUserPhone} });
    const pass = encriptar(credentials.accessUserPassword);

    if (access?.accessUserPassword === pass)  return true;
    else return false;
};

export const recuperarAccessService = async (email: string): Promise<void> => {
    console.log('estoy en el servicio', email);
    // await AppDataSource.getRepository(Users).findOne({ where: { userEmail: email } })
    // .then(userRec => {
    //     console.log(userRec);
    //     // const userEmailRec = userRec?.userEmail;
        // const accessRec = await AppDataSource.getRepository(AccessControl).findOne({ where: { accessUserPhone: userRec?.userPhone } });
        // const accessUserPasswordRec = desencriptar(accessRec.accessUserPassword);
    //}
    //)


}