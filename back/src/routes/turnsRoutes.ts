import { Router } from "express";
import { getAllTurns, getTurnById, schedule, cancel} from "../controllers/turnControllers";


const turnsRoutes: Router = Router();

turnsRoutes.get("/", getAllTurns);
turnsRoutes.get("/id", getTurnById);
turnsRoutes.post("/schedule", schedule);
turnsRoutes.post("/cancel", cancel);

export default turnsRoutes;