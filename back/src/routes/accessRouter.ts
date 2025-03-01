import { Router } from "express";
import { contactoUserAccess, getAccess, recuperarAccess } from '../controllers/accessController';

const accessRouter: Router = Router();

accessRouter.post("/", getAccess);
accessRouter.post("/:email", recuperarAccess);
accessRouter.patch("/:email", contactoUserAccess);

export default accessRouter;