import { ValidationFieldError } from "./types";

export default class ApiError extends Error {
  status: number;
  code: string;
  validationErrors: ValidationFieldError[];

  constructor(params: {
    message: string;
    status: number;
    code: string;
    validationErrors?: ValidationFieldError[];
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.code = params.code;
    this.validationErrors = params.validationErrors ?? [];
  }

  get isValidationError() {
    return this.code === "request_validation_error";
  }
}
