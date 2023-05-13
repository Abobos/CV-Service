import puppeteer from "puppeteer";
import fs from "fs";
import { join } from "path";
import ejs from "ejs";

/**
 *
 * @param data the data to render
 *
 */
export const getCVtemplate = <T>(data: T) => {
  const cvTemplate = fs.readFileSync(
    join(__dirname + "../../../template/cv.ejs"),
    "utf-8"
  );

  const html = ejs.render(cvTemplate, data);

  return html;
};

/**
 *
 * @param html the string format of the html page
 *
 */
export const generatePdf = async (html: string) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfStream = await page.createPDFStream({
    format: "A4",
    margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" },
  });

  return pdfStream;
};
