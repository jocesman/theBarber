import { Request, Response } from "express";
import AppointmentDto from "../dto/AppointmentDto";
import { createtAppointmentService } from "../services/appointmentService";


export const createAppointment = async (req: Request, res: Response) => {
    const appointment = req.body;
    const newAppointment = await createtAppointmentService(appointment);
    res.status(201).json(newAppointment);
};



// export const getAppointmentController = async (req: Request, res: Response) => {
//     const appointment = await getAppointmentService(req.params.id);
//     res.status(200).json(appointment);
// };

// export const deleteAppointmentController = async (req: Request, res: Response) => {
//     const appointment = await deleteAppointmentService(req.params.id);
//     res.status(200).json(appointment);
// };

// export const modifyAppointmentController = async (req: Request, res: Response) => {
//     const appointment = await modifyAppointmentService(req.params.id, req.body);
//     res.status(200).json(appointment);
// };