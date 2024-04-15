import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

const credRepository = AppDataSource.getRepository(Credential)

export default credRepository;