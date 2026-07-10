import { CurrentUser } from "@/app/entities/user/types";
import { handleApiResponse } from "@/shared/api/response";
import type { ApiSuccessResponse } from "@/shared/api/types";

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await fetch("/api/users/me", {
    method: "GET",
    cache: "no-store",
  });

  const result =
    await handleApiResponse<ApiSuccessResponse<CurrentUser>>(response);

  if (!result.data) {
    throw new Error("Current user data is missing");
  }

  return result.data;
}
