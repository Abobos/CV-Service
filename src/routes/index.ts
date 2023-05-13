import { Request, Response, Router } from "express";
import CvRoutes from "./cv";

const router = Router();

router.get("", (_req: Request, res: Response) => {
  res.send("Welcome to CV Service");
});

router.use(CvRoutes);

router.all("*", (_req: Request, res: Response) => {
  res.send("This route is unavailable");
});

export default router;
