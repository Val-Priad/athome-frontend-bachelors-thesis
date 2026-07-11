import { currentUserSchema } from "@/entities/user/schema";
import { handleApiResponse } from "@/shared/api/response";
import { apiDataResponseSchema } from "@/shared/api/schemas";

const currentUserResponseSchema = apiDataResponseSchema(currentUserSchema);

export async function getCurrentUser() {
  const response = await fetch("/api/users/me", {
    method: "GET",
    cache: "no-store",
  });

  const result = await handleApiResponse(response, currentUserResponseSchema);

  return result.data;
}
