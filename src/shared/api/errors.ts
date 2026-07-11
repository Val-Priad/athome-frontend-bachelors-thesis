import type { ValidationFieldError } from "./schemas";
import { type FieldErrors, validationErrorsToFieldErrors } from "./validation";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly validationErrors: ValidationFieldError[];

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

  get isValidationError(): boolean {
    return this.code === "request_validation_error";
  }
}

export class InvalidApiResponseError extends Error {
  constructor() {
    super("The server returned an invalid response.");
    this.name = "InvalidApiResponseError";
  }
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  return fallbackMessage;
}

export function getValidationFieldErrors<TField extends string>(
  error: unknown,
  formatError: (error: ValidationFieldError) => string,
): FieldErrors<TField> | null {
  if (!(error instanceof ApiError) || !error.isValidationError) {
    return null;
  }

  return validationErrorsToFieldErrors<TField>(
    error.validationErrors,
    formatError,
  );
}
