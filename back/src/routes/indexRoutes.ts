import turnsRoutes from "./turnsRoutes";
import usersRoutes from "./usersRoutes";
import { Router } from "express";

const indexRouter: Router = Router();

indexRouter.use("/users", usersRoutes);
indexRouter.use("/turns", turnsRoutes);

export default indexRouter;


