import { AppDataSource } from "../config/data-source";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import  IUser  from "../interfaces/IUsers"
import ICredentials from "../interfaces/ICredentials";
import { IAppointment } from "../interfaces/IAppointment";
import { AppointmentStatus } from "../entities/AppointmentStatus";
import { user1, user2, user3, user4, user5 } from "./usersCreateReload";
import { cred1, cred2, cred3, cred4, cred5 } from "./credsCreateReload";
import { appo1, appo2, appo3, appo4, appo5 } from "./appoCreate";
import { throws } from "assert";
import { error } from "console";


const parseTimeString = (timeString:string): Date => {
    // Separar el string en horas y minutos
    let parts = timeString.split(':');
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1].split(' ')[0], 10);
    let period = parts[1].split(' ')[1];
    // Crear objeto Date con la fecha actual
    let time = new Date();
    // Establecer horas y minutos
    time.setHours(hours);
    time.setMinutes(minutes);
    // Si es "PM" y las horas no son 12, agregar 12 horas
    if (period === 'PM' && hours !== 12) {
        time.setHours(time.getHours() + 12);
    }
    return time;
}

const formatearFecha = (fecha: string): Date => {
    let dateString = fecha; // Tu string de fecha
    // Separar el string en día, mes y año
    let parts = dateString.split('/');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // Los meses en JavaScript comienzan desde 0 (enero es 0)
    let year = parseInt(parts[2], 10);
    // Crear el objeto Date
    let date = new Date(year, month, day);
    return date;
}

const userRegister = async (user:IUser): Promise<User> => {
    let newUser = await AppDataSource.manager.create(User);
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.appointment = [];
    newUser.nDni = user1.nDni;
    newUser.birthdate= formatearFecha(user.birthdate);
    return newUser;
}

const credentialCreate = async (cred: ICredentials): Promise<Credential> => {
    let newCred = await AppDataSource.manager.create(Credential);
    newCred.username = cred.username;
    newCred.password = cred.password;
    newCred.active = true;
    newCred.createdAt = formatearFecha(cred.createAt);
    newCred.createdAt = formatearFecha(cred.updateAt);
    return newCred;
}

const appointmetCreate = async ( appo: IAppointment): Promise<Appointment> => {
    let newAppo = await AppDataSource.manager.create(Appointment);
    newAppo.date = formatearFecha(appo.date);
    newAppo.time = parseTimeString(appo.time);
    newAppo.status = AppointmentStatus.Active;
    return newAppo;
}

export const reloadData= async () => {
    await AppDataSource.manager.transaction( async (transactionalEntityManager) => {      
        
        const newUser1 = await userRegister(user1);
        const newUser2 = await userRegister(user2);
        const newUser3 = await userRegister(user3);
        const newUser4 = await userRegister(user4);
        const newUser5 = await userRegister(user5);

        newUser1.credential = await credentialCreate(cred1);
        newUser2.credential = await credentialCreate(cred2);
        newUser3.credential = await credentialCreate(cred3);
        newUser4.credential = await credentialCreate(cred4);
        newUser5.credential = await credentialCreate(cred5);

        const newAppo1 = await appointmetCreate(appo1);
        const newAppo2 = await appointmetCreate(appo2);
        const newAppo3 = await appointmetCreate(appo3);
        const newAppo4 = await appointmetCreate(appo4);
        const newAppo5 = await appointmetCreate(appo5);

        newAppo1.user = newUser1;
        newAppo2.user = newUser2;
        newAppo3.user = newUser3;
        newAppo4.user = newUser4;
        newAppo5.user = newUser5;

        await transactionalEntityManager.save(newUser1);
        await transactionalEntityManager.save(newUser2);
        await transactionalEntityManager.save(newUser3);
        await transactionalEntityManager.save(newUser4);
        await transactionalEntityManager.save(newUser5);

        await transactionalEntityManager.save(newAppo1);
        await transactionalEntityManager.save(newAppo2);
        await transactionalEntityManager.save(newAppo3);
        await transactionalEntityManager.save(newAppo4);
        await transactionalEntityManager.save(newAppo5);

        console.log('Recarga de datos realizada con éxito');
     });
}