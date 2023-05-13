import CVController from "../controllers/cv";
import { validator } from "../middlewares";

import { Request, Response, Router } from "express";

const CvRouter = Router();

CvRouter.post("/cv", [validator, CVController.generateCv]);

export default CvRouter;
