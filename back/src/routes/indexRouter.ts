import { Router } from "express";
import { createtUser, getUser, deleteUser, getUserByPhone } from "../controllers/userController";
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/users", userRouter);

export default router;