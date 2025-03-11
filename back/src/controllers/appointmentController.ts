import { Request, Response } from "express";
import { createtAppointmentService, deleteAppointmentService, getAppointmentbyPhoneService, getAppointmentService, modifyAppointmentService } from "../services/appointmentService";
import { Appointments } from "../entities/Appointments";

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    const phone = req.params.phone;
    const appointment = req.body;
    const newAppointment = await createtAppointmentService(phone, appointment);
    res.status(201).json(newAppointment); 
};

export const getAppointment = async (req: Request, res: Response) => {
    const appointment: Appointments[] = await getAppointmentService();
    res.status(200).json(appointment);
};

export const getAppointmentbyPhone = async (req: Request, res: Response) => {
    const appointment = await getAppointmentbyPhoneService(req.params.phone);
    if (appointment) res.status(200).json(appointment);
    else res.status(404).json({ message: "No se encontró ningún turno" });
};

export const deleteAppointment = async (req: Request, res: Response) => {
    const appointment = await deleteAppointmentService(req.params.phone);
    if (appointment.affected === 1) res.status(200).json({ message: "Turno eliminado" });
    else res.status(404).json({ message: "No se encontró ningún turno" });
};

export const modifyAppointment = async (req: Request, res: Response) => {
    const appointments: Appointments | null = await modifyAppointmentService(req.params.id);
    if (appointments) res.status(200).json({ message: "Turno modificado", "Turno": appointments })
    else res.status(404).json({ message: "No se encontró ningún turno" });
};
