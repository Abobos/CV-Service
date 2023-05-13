import { Router } from "express";
import CVController from "../controllers/cv";
// import { validator } from "../middlewares";

const router = Router();

router.get("", (req, res) => {
  res.send("Welcome to CV Service");
});

router.post("/cv", CVController.generateCv);

router.all("*", (req, res) => {
  res.send("This route is unavailable");
});

export default router;
