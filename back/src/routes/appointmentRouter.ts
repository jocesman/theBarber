import { Router } from "express";
import { createAppointment } from "../controllers/appointmentController";


const appointmentRouter: Router = Router();

appointmentRouter.post("/", createAppointment);

export default appointmentRouter;

