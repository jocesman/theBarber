import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";

const appoRepository = AppDataSource.getRepository(Appointment)

export default appoRepository;
