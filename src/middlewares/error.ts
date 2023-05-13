import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({ status: "failed", message: error.message });
};
