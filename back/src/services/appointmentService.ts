import exp from "constants";
import { AppDataSource } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointments } from "../entities/Appointments";


export const createtAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointments> => {
    const appointment = await AppDataSource.getRepository(Appointments).create(appointmentData);
    await AppDataSource.getRepository(Appointments).save(appointment);
    return appointment;
};

export const getAppointmentService = async(): Promise<Appointments[]> => {
    const appointment = await AppDataSource.getRepository(Appointments).find();
    return appointment;
};

export const getAppointmentbyPhoneService = async(phone: string): Promise<Appointments | null> => {
    const appointment = await AppDataSource.getRepository(Appointments).findOne({ where: { appointmentUserPhone: phone } });
    return appointment;
};

export const deleteAppointmentService = async(phone: string): Promise<any> => {
    return await AppDataSource.getRepository(Appointments).delete({ appointmentUserPhone: phone });
};

export const modifyAppointmentService = async(phone: string, appointmentData: AppointmentDto): Promise<Appointments | null> => {
    let appointment = await AppDataSource.getRepository(Appointments).findOneBy({ appointmentUserPhone: phone });
    if (!appointment) return null;
    await AppDataSource.getRepository(Appointments).merge(appointmentData);
    appointment = await AppDataSource.getRepository(Appointments).save(appointmentData);
    return appointment;
};
