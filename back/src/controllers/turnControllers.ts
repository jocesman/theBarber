import { Request, Response } from "express"; 
import { IAppoimtment } from "../interfaces/IAppointment";
import { createTurnsServices, getTurnServices, getTurnServiceById, deleteTurnServices } from "../services/appointmentService"

export const getAllTurns = async (req: Request, res: Response) => {
    //res.send ('Vamos a obtener todos los turnos');
    const turns: IAppoimtment[] = await getTurnServices();
    res.status(200).json(turns);
};

export const getTurnById = async(req: Request, res: Response) => {
    //res.send ('Vamos a obtener un turno por ID');
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    const turn: IAppoimtment[] = await getTurnServiceById(idConsulta);
    res.status(200).json(turn);
};

export const schedule = async(req: Request, res: Response) => {
    //res.send ('Vamos a agendar un turno');
    const { date, time, userId, status } = req.body
    const newTurn: IAppoimtment = await createTurnsServices({ date, time, userId, status});
    res.status(201).json(newTurn);
};

export const cancel = async(req: Request, res: Response) => {
    //res.send ('Vamos a cancelar un turno');
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    await deleteTurnServices(idConsulta);
    res.status(200).json('Operación completada');
};

