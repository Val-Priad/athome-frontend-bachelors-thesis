import { handleApiResponse } from "@/shared/api/response";
import { apiMessageResponseSchema } from "@/shared/api/schemas";

export type RegisterPayload = {
  email: string;
  password: string;
};

export type ResendVerificationPayload = {
  email: string;
};

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response, apiMessageResponseSchema);
}

export async function resendVerificationEmail(
  payload: ResendVerificationPayload,
) {
  const response = await fetch("/api/auth/resend-verification-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response, apiMessageResponseSchema);
}
