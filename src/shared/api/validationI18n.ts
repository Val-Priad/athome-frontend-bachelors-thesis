import { ValidationFieldError } from "./types";

type Translate = (
  key: string,
  values?: Record<string, string | number>,
) => string;

function safeTranslate(
  t: Translate,
  key: string,
  values: Record<string, string | number>,
  fallback: string,
): string {
  try {
    return t(key, values);
  } catch {
    return fallback;
  }
}

function normalizeFieldPath(field: string): string {
  return field
    .split(".")
    .map((part) => (/^\d+$/.test(part) ? "_" : part))
    .join(".");
}

function getParamValue(
  params: Record<string, unknown> | undefined,
  key: string,
): string | number {
  const value = params?.[key];

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return "";
}

export function formatValidationError(
  error: ValidationFieldError,
  t: Translate,
): string {
  const fieldKey = `fields.${normalizeFieldPath(error.field)}`;

  const field = safeTranslate(t, fieldKey, {}, error.field);

  const values: Record<string, string | number> = {
    field,
    message: error.message,
    min_length: getParamValue(error.params, "min_length"),
    max_length: getParamValue(error.params, "max_length"),
  };

  return safeTranslate(t, `errors.${error.code}`, values, error.message);
}
