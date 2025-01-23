
import { Router } from "express";
import { createtUser, getUser, deleteUser, getUserByPhone, modifyUser } from "../controllers/userController";
import auth from "../middlewares/auth";

const userRouter: Router = Router();

userRouter.post ("/", createtUser);
userRouter.get("/", auth,  getUser);
userRouter.get("/:phone", getUserByPhone);
userRouter.delete ("/:phone", deleteUser);
userRouter.put ("/:phone", modifyUser);

export default userRouter;