import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/Users";


const UserRepository = AppDataSource.getRepository(Users);

export default UserRepository;