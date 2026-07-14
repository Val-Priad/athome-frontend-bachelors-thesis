import "server-only";

import { cookies } from "next/headers";

import { type CurrentUser, currentUserSchema } from "@/entities/user/schema";
import { getBackendUrl } from "@/shared/api/getBackendUrl";
import { handleApiResponse } from "@/shared/api/response";
import { apiDataResponseSchema } from "@/shared/api/schemas";

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
