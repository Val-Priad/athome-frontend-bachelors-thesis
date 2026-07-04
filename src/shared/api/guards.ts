import { ApiErrorResponse } from "./types";

export default function isApiErrorResponse(
  data: unknown,
): data is ApiErrorResponse {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (!("error" in data)) {
    return false;
  }

  const error = data.error;

  if (!error || typeof error !== "object") {
    return false;
  }

  if (!("code" in error) || typeof error.code !== "string") {
    return false;
  }

  if (!("message" in error) || typeof error.message !== "string") {
    return false;
  }

  if ("errors" in error && error.errors !== undefined) {
    if (!Array.isArray(error.errors)) {
      return false;
    }

    return error.errors.every((validationError) => {
      return (
        validationError &&
        typeof validationError === "object" &&
        "field" in validationError &&
        "message" in validationError &&
        typeof validationError.field === "string" &&
        typeof validationError.message === "string" &&
        (!("code" in validationError) ||
          typeof validationError.code === "string") &&
        (!("params" in validationError) ||
          validationError.params === undefined ||
          (validationError.params !== null &&
            typeof validationError.params === "object"))
      );
    });
  }

  return true;
}
