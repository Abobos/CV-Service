import { Response, Request, NextFunction } from "express";

import { generatePdf, getCVtemplate } from "../utils";
import { RequestPayload } from "src/middlewares/types";

const CVController = {
  async generateCv(
    req: Request<never, never, RequestPayload, never>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user } = req.body;

      const html = getCVtemplate(user);
      const pdfStream = await generatePdf(html);

      const filename = `${user.first_name}-${user.last_name}-cv.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      pdfStream.pipe(res);
    } catch (error) {
      return next(error);
    }
  },
};

export default CVController;
