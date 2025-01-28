import { AppDataSource } from "../config/data-source";
import { AccessControl } from "../entities/AccessControl";


const AccessRepository = AppDataSource.getRepository(AccessControl);

export default AccessRepository;