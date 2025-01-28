import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointments";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepositry";


export const createtAppointmentService = async (phone: string, appointmentData: Appointments): Promise<Appointments | string> => {
    
    const user = await UserRepository.findOne({ 
        where: { userPhone : phone } });
    if (user) {
        const appointment = await AppointmentRepository.create(appointmentData);
        appointment.user = user;
        await AppointmentRepository.save(appointment);
        return appointment;
      };
    return "No se encontró ningún usuario con ese número de teléfono";
};

export const getAppointmentService = async(): Promise<Appointments[]> => {
    const appointment = await AppointmentRepository.find(
        {
            relations: ["user"]
        }
    );
    return appointment;
};

export const getAppointmentbyPhoneService = async(phone: string): Promise<Appointments | null> => {
    const appointment = await AppointmentRepository.findOne(
        { 
            where: { appointmentUserPhone: phone },
            relations: ["user"]
        });
    return appointment;
};

export const deleteAppointmentService = async(phone: string): Promise<any> => {
    return await AppointmentRepository.delete({ appointmentUserPhone: phone });
};

export const modifyAppointmentService = async(phone: string, appointmentData: Appointments): Promise<Appointments | null> => {
    let appointment = await AppointmentRepository.findOneBy({ appointmentUserPhone: phone });
    if (!appointment) return null;
    await AppointmentRepository.merge(appointmentData);
    appointment = await AppointmentRepository.save(appointmentData);
    return appointment;
};
