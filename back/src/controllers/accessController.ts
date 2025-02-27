import { getAccessService, recuperarAccessService } from "../services/accessService";
import { Request, Response } from "express";

export const getAccess = async (req: Request, res: Response) => {
    const access:boolean = await getAccessService(req.body);
    res.status(200).json(access);
};

export const recuperarAccess = async (req: Request, res: Response) => {
    console.log('Estoy en el controlador', req.params.email);
    const email:string = req.params.email;
    await recuperarAccessService(email);
    res.status(200).json(email);
};