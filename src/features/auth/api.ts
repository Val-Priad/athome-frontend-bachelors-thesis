import { handleApiResponse } from "@/shared/api/response";

export type RegisterPayload = {
  email: string;
  password: string;
};

type RegisterResponse = {
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
