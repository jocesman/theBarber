import { Request, Response } from "express";

export const getAllTurns = async (req: Request, res: Response) => {
    res.send ('Vamos a obtener todos los turnos');
};

export const getTurnById = async(req: Request, res: Response) => {
    res.send ('Vamos a obtener un turno por ID');
};

export const schedule = async(req: Request, res: Response) => {
    res.send ('Vamos a agendar un turno');
};

export const cancel = async(req: Request, res: Response) => {
    res.send ('Vamos a cancelar un turno');
};