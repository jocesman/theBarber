import { Router } from "express";
import { createAppointment, deleteAppointment, getAppointment, modifyAppointment, getAppointmentbyPhone } from "../controllers/appointmentController";
import { get } from "http";


const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAppointment);
appointmentRouter.get("/:phone", getAppointmentbyPhone);
appointmentRouter.post("/:phone", createAppointment);
appointmentRouter.delete("/:phone", deleteAppointment); //borrar posteriormente, se va a usar un PUT
appointmentRouter.put("/:id", modifyAppointment);

export default appointmentRouter;

