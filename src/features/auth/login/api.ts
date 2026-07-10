import { handleApiResponse } from "@/shared/api/response";

export type LogInPayload = {
  email: string;
  password: string;
};

type LogInResponse = {
  message: string;
};

export async function logInUser(payload: LogInPayload): Promise<LogInResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleApiResponse<LogInResponse>(response);
}
