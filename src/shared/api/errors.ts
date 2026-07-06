import ApiError from "./apiError";
import { FieldErrors, validationErrorsToFieldErrors } from "./validation";
import { ValidationFieldError } from "./types";

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
  if (!(error instanceof ApiError)) {
    return null;
  }

  if (!error.isValidationError) {
    return null;
  }

  return validationErrorsToFieldErrors<TField>(
    error.validationErrors,
    formatError,
  );
}
