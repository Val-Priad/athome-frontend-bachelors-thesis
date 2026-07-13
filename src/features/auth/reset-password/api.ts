import { apiFetch } from "@/shared/api/client";
import { handleApiResponse } from "@/shared/api/response";
import { apiMessageResponseSchema } from "@/shared/api/schemas";

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export async function requestPasswordReset(payload: ForgotPasswordPayload) {
  const response = await apiFetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response, apiMessageResponseSchema);
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const response = await apiFetch("/api/auth/verify-new-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response, apiMessageResponseSchema);
}
