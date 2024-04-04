import { Router } from "express";
import { getAllUsers, getUsersById, register } from "../controllers/usersControllers";
import auth from "../middlewares/auth";


const usersRoutes: Router = Router();

usersRoutes.get("/", getAllUsers);
usersRoutes.get("/id", getUsersById);
usersRoutes.post("/register", auth, register);

export default usersRoutes;