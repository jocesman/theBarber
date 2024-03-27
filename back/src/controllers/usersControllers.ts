import { createUserServices, getUserServices, deleteUserServices } from "../services/usersServices";
import IUser from "../interfaces/IUsers";
import { Request, Response } from "express";


export const createUser = async (req: Request, res: Response) => {
    const{ userName, userEmail, userPhone } = req.body;
    const newUser: IUser = await createUserServices({userName, userEmail, userPhone});
    res.status(201).json(newUser);
}

export const getUser = async (req: Request, res: Response) => {
   const users: IUser[] = await getUserServices();
   res.status(200).json(users);
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body;
    await deleteUserServices(id);
    res.status(200).json('Operación completada');
}