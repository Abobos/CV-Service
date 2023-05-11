import { Router } from "express";
import CVController from "src/controllers/cv";
import { validator } from "src/middlewares";

const router = Router();

router.get("", (req, res) => {
  res.send("Welcome to CV Service");
});

router.post("/cv", validator, CVController.generateCv);

router.all("*", (req, res) => {
  res.send("This route is unavailable");
});

export default router;
