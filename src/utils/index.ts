import puppeteer from "puppeteer";
import { ValidationType } from "./types";

/**
 *
 * @param html the string format of the html page
 *
 */
export const generatePdf = async (html: string) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfStream = await page.createPDFStream({ format: "A4" });

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
  const alphabetRegex = /^[A-Z\.a-z]+$/;
  const phoneNumberRegex = /^\+?\d{1,3}\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

  const validationMap = {
    [ValidationType.ALPHABET]: alphabetRegex,
    [ValidationType.PHONE_NUMBER]: phoneNumberRegex,
    [ValidationType.DATE]: dateRegex,
    [ValidationType.EMAIL]: emailRegex,
    [ValidationType.ADDRESS]: addressRegex,
  };

  const isValid = validationMap[type].test(data);

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

      return;
    }

    const validity = payload[key];

    if (!validity) response[key] = `${key} is not valid`;
  });

  return Object.keys(response).length > 0 ? response : undefined;
};
