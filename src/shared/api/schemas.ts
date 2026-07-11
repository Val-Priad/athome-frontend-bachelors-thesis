import { z } from "zod";

export const validationFieldErrorSchema = z.object({
  field: z.string(),
  code: z.string(),
  message: z.string(),
  params: z.record(z.string(), z.unknown()).optional(),
});

export const apiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    errors: z.array(validationFieldErrorSchema).optional(),
  }),
});

export const apiMessageResponseSchema = z.object({
  message: z.string(),
});

export function apiDataResponseSchema<TSchema extends z.ZodType>(
  dataSchema: TSchema,
) {
  return z.object({
    message: z.string(),
    data: dataSchema,
  });
}

export type ValidationFieldError = z.infer<typeof validationFieldErrorSchema>;

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
