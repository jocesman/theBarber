import AppoimtmentDto from "../dto/AppointmentDto";
import { IAppoimtment } from "../interfaces/IAppointment";

let turns: IAppoimtment[] = [];

let id: number = 1234;

export const createTurnsServices = async (turnData: AppoimtmentDto): Promise<IAppoimtment> => {
    // recibo los datos del usuario
    // creo un nuevo usuario
    // incluir el nuevo usuario en el arreglo
    // retornar el objeto creado
    id++;
    const newTurn: IAppoimtment = {
        id,
        date: turnData.date,
        time: turnData.time, 
        userId: turnData.userId,
        status: turnData.status
    }

    turns.push(newTurn);
    return newTurn;
}

export const getTurnServices = async (): Promise<IAppoimtment[]> => {
    return turns;
}

export const getTurnServiceById = async (id: number): Promise<IAppoimtment[]> => {
    const turn: IAppoimtment[] = turns.filter((turn: IAppoimtment) => {
        if (turn.id === id) return turn;        
    });
    return turn;
}

export const deleteTurnServices = async (id: number): Promise<void> => {
    turns = turns.filter((turn: IAppoimtment) => {
        return turn.id !== id;
    });
} 
