import { Router } from "express";
import { createUser, getUser, deleteUser } from "../controllers/usersControllers";

const router = Router();

router.post ("/users", createUser);

router.get ("/users", getUser);

router.delete ("/users", deleteUser);


export default router;
