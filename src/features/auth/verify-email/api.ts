import { handleApiResponse } from "@/shared/api/response";
import { apiMessageResponseSchema } from "@/shared/api/schemas";

export async function verifyEmail(token: string) {
  const response = await fetch(
    `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
    {
      method: "GET",
    },
  );

  return handleApiResponse(response, apiMessageResponseSchema);
}
