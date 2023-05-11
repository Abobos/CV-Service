import express, { json } from "express";
import { errorHandler } from "./middlewares";
import router from "./routes";

const app = express();

app.use(json());
app.use(router);
app.use(errorHandler);

export default app;
