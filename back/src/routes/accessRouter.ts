import { Router } from "express";
import { getAccess, recuperarAccess } from '../controllers/accessController';

const accessRouter: Router = Router();

accessRouter.post("/", getAccess);
accessRouter.post("/:email", recuperarAccess);

export default accessRouter;