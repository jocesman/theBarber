import { AppDataSource } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointments } from "../entities/Appointments";


export const createtAppointmentService = async (appointmentData: AppointmentDto) => {
    const appointment = await AppDataSource.getRepository(Appointments).create(appointmentData);
    await AppDataSource.getRepository(Appointments).save(appointment);
    return appointment;
};