import AppoimtmentDto from "../dto/AppointmentDto";
import { IAppointment } from "../interfaces/IAppointment";
import { Appointment } from "../entities/Appointment";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/Users";

let turns: IAppointment[] = [];

let id: number = 1234;

export const getTurnServices = async (): Promise<Appointment[]> => {
    const turns = await AppDataSource.getRepository(Appointment).find({
        relations:{
            user: true
        }
});
    return turns;
}

export const createTurnsServices = async (turnData: Appointment): Promise<IAppointment> => {
    
    //const newTurn = await AppDataSource.save (turnData)
    
    
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado
    /*id++;
    const newTurn: IAppoimtment = {
        id,
        date: turnData.date,
        time: turnData.time, 
        userId: turnData.userId,
        status: turnData.status
    }
    turns.push(newTurn);*/
    const newTurn: IAppointment = {
        id: turnData.appointmentId,
        userId: turnData.appointmentId,
        date: turnData.date,
        time: turnData.time, 
        status: turnData.status
    }
    return newTurn ;
}



export const getTurnServiceById = async (id: number): Promise<IAppointment[]> => {
    const turn: IAppointment[] = turns.filter((turn: IAppointment) => {
        if (turn.id === id) return turn;        
    });
    return turn;
}

export const deleteTurnServices = async (id: number): Promise<void> => {
    turns = turns.filter((turn: IAppointment) => {
        return turn.id !== id;
    });
} 
