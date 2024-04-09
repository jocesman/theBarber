
import { Request, Response } from "express";
import IUser from "../interfaces/IUsers";
import { getUserServices } from "../services/usersServices"
import { User } from "../entities/Users";

export const getAllUsers = async (req: Request, res: Response) => {
    const users: User[] = await getUserServices();
    res.status(200).json(users);
};








/*

import { createUserServices, getUserServices, deleteUserServices } from "../services/usersServices";
import IUser from "../interfaces/IUsers";
import { Request, Response } from "express";

export const getUsersById = async(req: Request, res: Response) => {
    //res.send ('Vamos a obtener un usuario por ID');
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    const user: User[] = await getUserById(idConsulta);
    res.status(200).json(user);
};



export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    await deleteUserServices(idConsulta);
    res.status(200).json('Operación completada');
}

/*export const register = async(req: Request, res: Response) => {
    //res.send ('Vamos a crear un nuevo usuario');
    const{ name, email, birthdate, nDni, credentialId } = req.body;
    const newUser = await createUserServices({
         name, 
         email, 
         birthdate, 
         nDni, 
         credentialId
        });
    res.status(201).json(newUser);
};*/
/*
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
}*/