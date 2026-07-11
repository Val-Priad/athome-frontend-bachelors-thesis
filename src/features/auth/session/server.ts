import "server-only";

import { cookies } from "next/headers";

import { currentUserSchema, type CurrentUser } from "@/entities/user/schema";
import { handleApiResponse } from "@/shared/api/response";
import { apiDataResponseSchema } from "@/shared/api/schemas";
import { getBackendUrl } from "@/shared/api/getBackendUrl";

const currentUserResponseSchema = apiDataResponseSchema(currentUserSchema);

export async function getCurrentUserOnServer(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    if (!cookieHeader) {
      return null;
    }

    const response = await fetch(`${getBackendUrl()}/api/users/me`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      return null;
    }

    const result = await handleApiResponse(response, currentUserResponseSchema);

    return result.data;
  } catch (error) {
    console.error("Failed to initialize current user", error);

    return null;
  }
}
