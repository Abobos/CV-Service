import {
  ValidationSchemaPayload,
  ValidationSchemaResponse,
  ValidationType,
} from "./types";

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
 * @param payload The schema payload to validate
 *
 */
export const ValidateSchema = (payload: ValidationSchemaPayload) => {
  const response: ValidationSchemaResponse = {};

  Object.keys(payload).forEach((key) => {
    if (!Array.isArray(payload[key]) && typeof payload[key] === "object") {
      response[key] = ValidateSchema(
        payload[key] as Record<string, boolean>
      ) as Record<string, string>;

      return;
    }

    if (Array.isArray(payload[key])) {
      response[key] = [];

      (payload[key] as Array<Record<string, boolean>>).forEach((data) => {
        (response[key] as Array<Record<string, string>>).push(
          ValidateSchema(data) as Record<string, string>
        );
      });

      const responses = (response[key] as Array<Record<string, string>>).filter(
        (datum) => Boolean(datum)
      );

      if (responses.length === 0) response[key] = undefined;

      return;
    }

    const validity = payload[key];

    if (!validity) response[key] = `${key} is not valid`;
  });

  const errorResponses = Object.values(response).filter(Boolean);

  return errorResponses.length > 0 ? response : undefined;
};
