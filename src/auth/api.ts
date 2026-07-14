import { currentUserSchema } from "@/entities/user/schema";
import { apiFetch } from "@/shared/api/client";
import { handleApiResponse } from "@/shared/api/response";
import {
  apiDataResponseSchema,
  apiMessageResponseSchema,
} from "@/shared/api/schemas";

const currentUserResponseSchema = apiDataResponseSchema(currentUserSchema);

export async function getCurrentUser() {
  const response = await fetch("/api/users/me", {
    method: "GET",
    cache: "no-store",
  });

  const result = await handleApiResponse(response, currentUserResponseSchema);

  return result.data;
}

export async function logoutUser() {
  const response = await apiFetch("/api/auth/logout", {
    method: "POST",
    requiresCsrf: true,
  });

  return handleApiResponse(response, apiMessageResponseSchema);
}
