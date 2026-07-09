import { handleApiResponse } from "@/shared/api/response";

export type RegisterPayload = {
  email: string;
  password: string;
};

type RegisterResponse = {
  message: string;
};

export type ResendVerificationPayload = {
  email: string;
};

type ResendVerificationResponse = {
  message: string;
};

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse<RegisterResponse>(response);
}

export async function resendVerificationEmail(
  payload: ResendVerificationPayload,
): Promise<ResendVerificationResponse> {
  const response = await fetch("/api/auth/resend-verification-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse<ResendVerificationResponse>(response);
}
