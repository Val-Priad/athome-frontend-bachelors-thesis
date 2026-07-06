import { handleApiResponse } from "@/shared/api/response";

export type VerifyEmailResponse = {
  message: string;
};

export async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  const response = await fetch(
    `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
    {
      method: "GET",
    },
  );

  return handleApiResponse<VerifyEmailResponse>(response);
}
