import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/Appointments";
import { Users } from "../entities/Users";


export const createtAppointmentService = async (appointmentData: Appointments): Promise<Appointments> => {
    const appointment = await AppDataSource.getRepository(Appointments).create(appointmentData);
    await AppDataSource.getRepository(Appointments).save(appointment);

    const user = await AppDataSource.getRepository(Users).findOne({ 
        where: { userPhone : appointmentData.appointmentUserPhone } });
    
      if (user) {
        console.log(user);
        appointment.user = user;
        await AppDataSource.getRepository(Appointments).save(appointment);
    };

    return appointment;
};

export const getAppointmentService = async(): Promise<Appointments[]> => {
    const appointment = await AppDataSource.getRepository(Appointments).find(
        {
            relations: ["user"]
        }
    );
    return appointment;
};

export const getAppointmentbyPhoneService = async(phone: string): Promise<Appointments | null> => {
    const appointment = await AppDataSource.getRepository(Appointments).findOne(
        { 
            where: { appointmentUserPhone: phone },
            relations: ["user"]
        });
    return appointment;
};

export const deleteAppointmentService = async(phone: string): Promise<any> => {
    return await AppDataSource.getRepository(Appointments).delete({ appointmentUserPhone: phone });
};

export const modifyAppointmentService = async(phone: string, appointmentData: Appointments): Promise<Appointments | null> => {
    let appointment = await AppDataSource.getRepository(Appointments).findOneBy({ appointmentUserPhone: phone });
    if (!appointment) return null;
    await AppDataSource.getRepository(Appointments).merge(appointmentData);
    appointment = await AppDataSource.getRepository(Appointments).save(appointmentData);
    return appointment;
};
