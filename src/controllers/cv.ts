import { Response, Request, NextFunction } from "express";
import ejs from "ejs";
import fs from "fs";
import { join } from "path";
import { generatePdf } from "../utils";

const cvTemplate = fs.readFileSync(
  join(__dirname + "../../../template/cv.ejs"),
  "utf-8"
);

const CVController = {
  async generateCv(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;

      const html = ejs.render(cvTemplate, user);
      const pdfStream = await generatePdf(html);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="cv.pdf"');

      pdfStream.pipe(res);
    } catch (error) {
      return next(error);
    }
  },
};

export default CVController;
