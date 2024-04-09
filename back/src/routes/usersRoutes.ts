import { Router } from "express";
import { getAllUsers } from "../controllers/usersControllers";
import auth from "../middlewares/auth";


const usersRoutes: Router = Router();

usersRoutes.get("/", getAllUsers);
/*usersRoutes.get("/:id", getUsersById);
usersRoutes.post("/register", auth, register);
usersRoutes.post("/delete/:id", deleteUser);*/

export default usersRoutes;