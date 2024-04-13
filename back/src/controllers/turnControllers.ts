import { Request, Response } from "express";  
import { createTurnsServices, getTurnServices, getTurnServiceById, cancelTurnServices } from "../services/appointmentService"
import { Appointment } from "../entities/Appointment";

export const getAllTurns = async (req: Request, res: Response) => {
    //res.send ('Vamos a obtener todos los turnos');
    const turns: Appointment[] = await getTurnServices();
    res.status(200).json(turns);
};

export const getTurnById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    const turn = await getTurnServiceById(idConsulta);
    if (turn == null)  res.status(400).json({"message":"Turno no encontrado"});
    res.status(200).json(turn);
};

export const schedule = async(req: Request, res: Response) => {
    const { id, date, time } = req.body;
    const respuesta = await createTurnsServices({ id, date, time });
    if (respuesta) res.status(201).json('Turno creado con exito');
    else res.status(400).json('Turno no se pudo crear, favor revisar / Usuario inexistente')
};

export const cancel = async(req: Request, res: Response) => {
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    const respuesta: boolean = await cancelTurnServices(idConsulta);
    if (respuesta) res.status(200).json('Operación completada');
    else res.status(400).json('Turno no existe');
};

