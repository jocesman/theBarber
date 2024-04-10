import { Request, Response } from "express"; 
import { IAppointment } from "../interfaces/IAppointment";
import { createTurnsServices, getTurnServices, getTurnServiceById, deleteTurnServices } from "../services/appointmentService"
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/Users";

export const getAllTurns = async (req: Request, res: Response) => {
    //res.send ('Vamos a obtener todos los turnos');
    const turns: Appointment[] = await getTurnServices();
    res.status(200).json(turns);
};

export const getTurnById = async(req: Request, res: Response) => {
    //res.send ('Vamos a obtener un turno por ID');
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    const turn: IAppointment[] = await getTurnServiceById(idConsulta);
    res.status(200).json(turn);
};

export const schedule = async(req: Request, res: Response) => {
    //res.send ('Vamos a agendar un turno');
    const { id, userId, date, time, status } = req.body
    //const newTurn: Appointment = await createTurnsServices({ date, time, status});
    //const newTurn: IAppointment = await createTurnsServices({ appointmentId, userId, date, time, status });
    //res.status(201).json(newTurn);
};

export const cancel = async(req: Request, res: Response) => {
    //res.send ('Vamos a cancelar un turno');
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    await deleteTurnServices(idConsulta);
    res.status(200).json('Operación completada');
};

