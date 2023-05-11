import { Request, Response, NextFunction } from "express";
import { validateAgainstRegex, ValidateSchema } from "src/utils";
import { ValidationType } from "src/utils/types";
import { RequestPayload } from "./types";

export const validator = (
  req: Request<never, never, RequestPayload, never>,
  res: Response,
  next: NextFunction
) => {
  const {
    user: { first_name, last_name, contacts, experience },
  } = req.body;

  const schema = {
    user: {
      first_name: validateAgainstRegex(first_name),
      last_name: validateAgainstRegex(last_name),
    },
    contacts: {
      place: validateAgainstRegex(contacts.place, ValidationType.ADDRESS),
      email: validateAgainstRegex(contacts.email, ValidationType.EMAIL),
      phone: validateAgainstRegex(contacts.phone, ValidationType.PHONE_NUMBER),
    },
    experience: experience.map((exp) => ({
      title: validateAgainstRegex(exp.title),
      company: validateAgainstRegex(exp.company),
      start_date: validateAgainstRegex(exp.start_date, ValidationType.DATE),
      end_date: validateAgainstRegex(exp.end_date, ValidationType.DATE),
    })),
  };

  const errors = ValidateSchema(schema);

  if (errors) {
    return res.status(422).json({
      code: "422",
      errors,
    });
  }

  return next();
};
