import { Router } from "express";
import { getAllUsers, register, getUsersById, deleteUser } from "../controllers/usersControllers";
import auth from "../middlewares/auth";


const usersRoutes: Router = Router();

usersRoutes.get("/", getAllUsers);
usersRoutes.get("/:id", getUsersById);
usersRoutes.post("/register", register);
usersRoutes.delete("/delete/:id", deleteUser);

export default usersRoutes;