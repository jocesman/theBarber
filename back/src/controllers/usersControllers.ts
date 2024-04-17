
import { Request, Response } from "express";
import { revisarSiExisteUsuario } from "../middlewares/revisarSiExisteUsuario";
import { 
    getUserServices, 
    createUserServices, 
    getUserByIdService, 
    deleteUserServices, 
    bajaTemporalUserServices } 
    from "../services/usersServices";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credential";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUserServices();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const register = async(req: Request, res: Response) => {
    const { name, email, birthdate, nDni } = req.body;
    const { username, password } = req.body;

    // Validación de datos
    if (!name || !email || !birthdate || !nDni || !username || !password) {
        return res.status(400).json(
            { 
                error: 'Datos incompletos', 
                message: 'Todos los campos son requeridos' 
            });
    };
    
    const newUser = new User();
    Object.assign(newUser, { name, email, birthdate, nDni });
    /*newUser.name = name;
    newUser.email = email; 
    newUser.birthdate = birthdate;
    newUser.nDni = nDni;*/

    const credentialParams = new Credential();
    Object.assign(credentialParams, { username, password });
    /*credentialParams.username = username;
    credentialParams.password = password;*/

    try {
        if (await revisarSiExisteUsuario(newUser.email)) {
            return res.status(409).json({
                error: 'Correo electrónico ya registrado',
                message: `El correo electrónico ${newUser.email} ya está asociado a una cuenta. Por favor, intenta con otro correo electrónico`
            });
        };
        
        const respuesta = await createUserServices(newUser, credentialParams);
        if (respuesta) res.status(201).json(newUser);
        else res.status(400).json('No se pudo registrar el nuevo usuario, favor revise los datos ingresados');
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    };
};

export const getUsersById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idConsulta: number = parseInt(id);
        const user = await getUserByIdService(idConsulta);
        
        if (!user) {
            return res.status(404).json({ 
                error: 'Usuario no encontrado', 
                message: 'El usuario con el ID proporcionado no existe' 
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idDelete: number = parseInt(id);
        const respuesta:boolean = await deleteUserServices(idDelete);
        if (respuesta){
            res.status(200).json('Operación completada: Usuario Eliminado');
        } else {
            res.status(404).json('No se puso completar la eliminación del usuario o usuario no existe');
        };
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    };   
}

export const bajaTemporalUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idBaja: number = parseInt(id);
        const respuesta:boolean = await bajaTemporalUserServices(idBaja);

        if (respuesta){
            res.status(200).json({ message: 'Operación completada: Usuario dado de baja' });
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado', message: `Usuario con ID ${idBaja} no encontrado` });
        };
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    };
}





