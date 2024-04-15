import { AppointmentStatus } from "../interfaces/IAppointment";
import { Appointment } from "../entities/Appointment";
import userRepository from "../repositories/userRepository";
import appoRepository from "../repositories/appoReposiroty";

export const getTurnServices = async (): Promise<Appointment[]> => {
    const turns = await appoRepository.find({
        relations:{
            user: true
        }
});
    return turns;
}

export const createTurnsServices = async ( turndata: any): Promise<boolean> => {
    const user = await userRepository;
    const turn = await appoRepository;
    const userApp = await user.findOne({
        where: {
            userId: turndata.id
        }
    });

    if (!userApp) return false;

    const newTurn = new Appointment();
    

    // Suponiendo que turndata.time es una cadena de texto que representa la hora en formato HH:MM:SS
    const horaMinutoSegundo = turndata.time.split(':'); // Dividir la cadena en horas, minutos y segundos

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Crear un nuevo objeto Date con los componentes de la hora y fecha actual
    const nuevaFechaHora = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    fechaActual.getDate(),
    parseInt(horaMinutoSegundo[0]), // Horas
    parseInt(horaMinutoSegundo[1]), // Minutos
    parseInt(horaMinutoSegundo[2])  // Segundos
    );

    // Asignar el objeto Date al nuevo objeto Turn
    newTurn.date = turndata.date;
    newTurn.time = nuevaFechaHora;
    newTurn.status = AppointmentStatus.Active;
    newTurn.user = userApp;

    await turn.save(newTurn);
    
    return true;
}

export const getTurnServiceById = async (id: number) => {
    const turn = await appoRepository;
    const turnById = turn.findOne({
        where: {
            appointmentId: id
        },
        relations: {
            user: true
        }
    });
    return turnById;
}

export const cancelTurnServices = async (id: number): Promise<boolean> => {
    const turnCancel = await appoRepository;
    const turn = await turnCancel.findOne({
        where: { appointmentId: id },
    });
    if (!turn) return false;
    turn.status = AppointmentStatus.Cancelled;
    await turnCancel.save(turn);
    return true;    
} 
