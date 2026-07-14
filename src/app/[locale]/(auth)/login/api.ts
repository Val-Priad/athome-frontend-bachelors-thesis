import { apiFetch } from "@/shared/api/client";
import { handleApiResponse } from "@/shared/api/response";
import { apiMessageResponseSchema } from "@/shared/api/schemas";

export type LogInPayload = {
  email: string;
  password: string;
};

export async function logInUser(payload: LogInPayload) {
  const response = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response, apiMessageResponseSchema);
}
