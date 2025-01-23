import { AppDataSource } from "../config/data-source";
import AccessDto from "../dto/AccessDto";
import { AccessControl } from "../entities/AccessControl";

export const createtAccessService = async (credentials: AccessDto) => {
    const access = await AppDataSource.getRepository(AccessControl).create(credentials);
    await AppDataSource.getRepository(AccessControl).save(access);
    return access;
};