import { Request, Response } from "express";
import {    getUserService, 
            createtUserService,
            deleteUserService, 
            getUserByPhoneService, 
            modifyUserService } 
from "../services/userService";

import { createtAccessService } from "../services/accessService";
import { encriptar } from "../middlewares/encriptacion";
import { Users } from "../entities/Users";
import { AccessControl } from "../entities/AccessControl";

export const createtUser = async (req: Request, res: Response) => { 
    const { userPhone, userName, userLastName, userBirthDate, userId, userEmail, userAddress, userCity, userDateCreated, userStatus, userTypeUser }: Users = req.body;

    const contraseña = encriptar(req.body.userPassword);

    const credentials = {
          accessUserPhone: userPhone, 
          accessUserEmail: userEmail, 
          accessUserPassword: contraseña,
          accessLastVisit: new Date()
    };

    const newUser = await createtUserService({
        userPhone, userName, userLastName, userBirthDate, userId, userEmail, userAddress, userCity, userDateCreated, userStatus, userTypeUser,
        accessControl: new AccessControl,
        appointments: []
    });

    await createtAccessService(credentials);

    res.status(201).json(newUser);
};

export const getUserByPhone = async(req: Request, res: Response) => { 
    const phone: string = req.params.phone;
    const user: Users | null = await getUserByPhoneService(phone);
    if (user) res.status(200).json(user)    
        else res.status(404).json({ message: "Usuario no encontrado" });
};

export const getUser = async(req: Request, res: Response) => { 
    const user: Users[] = await getUserService();
    res.status(200).json(user);
 
};

export const deleteUser = async(req: Request, res: Response) => { 
    const phone: string = req.params.phone;
    const user = await deleteUserService(phone);
    if (user.affected === 1) res.status(200).json({ message: "Usuario eliminado" });
        else res.status(404).json({ message: "Usuario no encontrado" });
    
};

export const modifyUser = async(req: Request, res: Response) => { 
    const phone: string = req.params.phone;
    const userData: Users = req.body;
    const user: Users | null = await modifyUserService(phone, userData);
    if (user) res.status(200).json({ message: "Usuario modificado", "Usuario": user })
     else res.status(404).json({ message: "Usuario no encontrado" });
};

