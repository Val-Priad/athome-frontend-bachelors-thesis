import type { ValidationFieldError } from "./schemas";

export type FieldErrors<TField extends string> = Partial<
  Record<TField, string[]>
>;

type ValidationErrorFormatter = (error: ValidationFieldError) => string;

export function validationErrorsToFieldErrors<TField extends string>(
  errors: ValidationFieldError[],
  formatError: ValidationErrorFormatter = (error) => error.message,
): FieldErrors<TField> {
  return errors.reduce<FieldErrors<TField>>((acc, error) => {
    const field = error.field as TField;

    acc[field] = [...(acc[field] ?? []), formatError(error)];

    return acc;
  }, {});
}

export function getFieldErrors<TField extends string>(
  fieldErrors: FieldErrors<TField>,
  field: TField,
): string[] {
  return fieldErrors[field] ?? [];
}

export function getFirstFieldError<TField extends string>(
  fieldErrors: FieldErrors<TField>,
  field: TField,
): string | undefined {
  return fieldErrors[field]?.[0];
}

export function hasFieldError<TField extends string>(
  fieldErrors: FieldErrors<TField>,
  field: TField,
): boolean {
  return Boolean(fieldErrors[field]?.length);
}
