import puppeteer from "puppeteer";
import { ValidationType } from "./types";
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

/**
 *
 * @param data The data to be validated
 * @param type The type of data to be validated so
 * we know the right regex to use for validation
 *
 */
export const validateAgainstRegex = (
  data: string = "",
  type: ValidationType = ValidationType.ALPHABET
) => {
  const alphabetRegex = /^[a-zA-Z\s.-]+$/;
  const phoneNumberRegex = /^\+?\d{1,3}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

  const validationMap = {
    [ValidationType.ALPHABET]: alphabetRegex,
    [ValidationType.PHONE_NUMBER]: phoneNumberRegex,
    [ValidationType.DATE]: data.includes("Present") ? alphabetRegex : dateRegex,
    [ValidationType.EMAIL]: emailRegex,
    [ValidationType.ADDRESS]: addressRegex,
  };

  const isValid = validationMap[type].test(data.trim());

  return isValid;
};

/**
 *
 * @param payload The payload to validate
 *
 */
export const ValidateSchema = (payload: any) => {
  const response: any = {};

  Object.keys(payload).forEach((key) => {
    if (!Array.isArray(payload[key]) && typeof payload[key] === "object") {
      response[key] = ValidateSchema(payload[key]);

      return;
    }

    if (Array.isArray(payload[key])) {
      response[key] = [];

      payload[key].forEach((data: any) => {
        response[key].push(ValidateSchema(data));
      });

      const responses = response[key].filter((datum: any) => Boolean(datum));

      if (responses.length === 0) response[key] = undefined;

      return;
    }

    const validity = payload[key];

    if (!validity) response[key] = `${key} is not valid`;
  });

  const errorResponses = Object.values(response).filter(Boolean);

  return errorResponses.length > 0 ? response : undefined;
};
