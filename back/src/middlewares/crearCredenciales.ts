import { AppDataSource } from "../config/data-source"
import { Credential } from "../entities/Credential"


export const CrearCredenciales = async (credentialParams: Credential):Promise<Credential> => {
    const newPass = await AppDataSource.manager.save(credentialParams);
    return newPass;
}