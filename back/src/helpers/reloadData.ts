import { AppDataSource } from "../config/data-source";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credential";
import { Appointment } from "../entities/Appointment";
import  IUser  from "../interfaces/IUsers"
import ICredentials from "../interfaces/ICredentials";
import { IAppointment } from "../interfaces/IAppointment";
import { AppointmentStatus } from "../entities/AppointmentStatus";
import { preloadUsers } from "./usersCreateReload"; 
import { preloadCred } from "./credsCreateReload";
import { appo } from "./appoCreate";


export const reloadData= async () => {
    //await AppDataSource.manager.transaction( async (transactionalEntityManager) => {      
        const users = await AppDataSource.manager.find(User);
        if (users.length) return console.log('No se hizo la precarga porque ya hay datos');
        let ind = 0;
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction()
        try {
            for await (const user of preloadUsers) {
                const newUser = await userRegister(user);
                const newAppo = await appointmetCreate(appo[ind])
                newUser.credential = await credentialCreate(preloadCred[ind]);
                newAppo.user = newUser;
                ind++;
                //await transactionalEntityManager.save(newUser);
                await queryRunner.manager.save(newUser);
                //await transactionalEntityManager.save(newAppo);
                await queryRunner.manager.save(newAppo);
                
            };
            await queryRunner.commitTransaction();                                                
            console.log('Recarga de datos realizada con éxito');    
        } catch (error) {
            console.log ('<-- Error en la precarga -->')           
            await queryRunner.rollbackTransaction()
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release()
        }
        
    //});
};

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
    newUser.nDni = user.nDni;
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