export enum ValidationType {
  ALPHABET = "alphabet",
  PHONE_NUMBER = "phone_number",
  DATE = "date",
  EMAIL = "email",
  ADDRESS = "address",
}

export type ValidationSchemaPayload =
  | Record<string, boolean>
  | Record<string, Record<string, boolean> | Array<Record<string, boolean>>>;

export type ValidationSchemaResponse =
  | Record<string, string>
  | Record<string, Record<string, string> | Array<Record<string, string>>>;
