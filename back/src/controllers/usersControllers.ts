
import { Request, Response } from "express";
import IUser from "../interfaces/IUsers";
import { getUserServices, createUserServices, getUserByIdService, deleteUserServices } from "../services/usersServices"
import { User } from "../entities/Users";
import { Credential } from "../entities/Credential";

export const getAllUsers = async (req: Request, res: Response) => {
    const users: User[] = await getUserServices();
    res.status(200).json(users);
};

export const register = async(req: Request, res: Response) => {
    const { name, email, birthdate, nDni } = req.body;
    const { username, password } = req.body;
    //const newUser = { name, email, birthdate, nDni };
    
    const newUser = new User();
    newUser.name = name;
    newUser.email = email; 
    newUser.birthdate = birthdate;
    newUser.nDni = nDni;

    const credentialParams = new Credential();
    credentialParams.username = username;
    credentialParams.password = password;
     
    await createUserServices(newUser, credentialParams);

    res.status(201).json(newUser);
};


export const getUsersById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const idConsulta: number = parseInt(id);
    const user = await getUserByIdService(idConsulta);
    if (user == null)  res.status(400).json({"message":"Usuario no encontrado"});
    else res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idDelete: number = parseInt(id);
    
    const respuesta:boolean = await deleteUserServices(idDelete);
    if (respuesta){
        res.status(200).json('Operación completada: Usuario Eliminado');
    } else {
        res.status(400).json(`User with id ${id} not found`);
    };
}





