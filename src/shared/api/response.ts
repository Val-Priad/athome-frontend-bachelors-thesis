import { z } from "zod";

import { ApiError, InvalidApiResponseError } from "./errors";
import { apiErrorResponseSchema } from "./schemas";

export async function handleApiResponse<TSchema extends z.ZodType>(
  response: Response,
  successSchema: TSchema,
): Promise<z.output<TSchema>> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const result = apiErrorResponseSchema.safeParse(data);

    if (!result.success) {
      console.error("Invalid API error response", result.error);

      throw new ApiError({
        status: response.status,
        code: "unknown_error",
        message: "Request failed",
      });
    }

    throw new ApiError({
      status: response.status,
      code: result.data.error.code,
      message: result.data.error.message,
      validationErrors: result.data.error.errors,
    });
  }

  const result = successSchema.safeParse(data);

  if (!result.success) {
    console.error("Invalid API success response", result.error);

    throw new InvalidApiResponseError();
  }

  return result.data;
}
