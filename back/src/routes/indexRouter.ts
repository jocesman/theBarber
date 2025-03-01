import { Router } from "express";
import userRouter from "./userRouter";
import appointmentRouter from "./appointmentRouter";
import accessRouter from "./accessRouter";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/turns", appointmentRouter);
router.use("/login", accessRouter);    
router.use("/recuperarAcceso", accessRouter);
router.use("/contacto", accessRouter);

export default router;