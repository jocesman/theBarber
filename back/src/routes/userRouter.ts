
import { Router } from "express";
import { createtUser, getUser, deleteUser, getUserByPhone, modifyUser } from "../controllers/userController";

const userRouter: Router = Router();

userRouter.post ("/", createtUser);
userRouter.get("/", getUser);
userRouter.get("/:phone", getUserByPhone);
userRouter.delete ("/:phone", deleteUser);
userRouter.put ("/:phone", modifyUser);

export default userRouter; 