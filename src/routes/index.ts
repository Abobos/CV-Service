import { Request, Response, Router } from "express";
import CVController from "../controllers/cv";
// import { validator } from "../middlewares";

const router = Router();

router.get("", (_req: Request, res: Response) => {
  res.send("Welcome to CV Service");
});

router.post("/cv", CVController.generateCv);

router.all("*", (_req: Request, res: Response) => {
  res.send("This route is unavailable");
});

export default router;
