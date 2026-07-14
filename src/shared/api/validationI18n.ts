import { useTranslations } from "next-intl";

import type { ValidationFieldError } from "./schemas";

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

export function useValidationErrorFormatter() {
  const t = useTranslations("Validation");

  const translateKnownKey: Translate = (key, values) => {
    switch (key) {
      case "fields.email":
        return t("fields.email");
      case "fields.password":
        return t("fields.password");
      case "errors.missing":
        return t("errors.missing", values);
      case "errors.string_too_long":
        return t("errors.string_too_long", values);
      case "errors.string_too_short":
        return t("errors.string_too_short", values);
      case "errors.value_error":
        return t("errors.value_error", values);
      case "errors.default":
        return t("errors.default", values);
      default:
        throw new Error(`Unknown validation translation key: ${key}`);
    }
  };

  return (error: ValidationFieldError) =>
    formatValidationError(error, translateKnownKey);
}
