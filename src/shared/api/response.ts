import ApiError from "./apiError";
import isApiErrorResponse from "./guards";

async function readJsonSafely(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  const data = await readJsonSafely(response);

  if (!response.ok) {
    if (isApiErrorResponse(data)) {
      throw new ApiError({
        status: response.status,
        code: data.error.code,
        message: data.error.message,
        validationErrors: data.error.errors,
      });
    }
    throw new ApiError({
      status: response.status,
      code: "unknown_error",
      message: "Request failed",
    });
  }

  return data as T;
}
