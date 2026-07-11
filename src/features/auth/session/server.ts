import "server-only";

import { cookies } from "next/headers";

import type { CurrentUser } from "@/entities/user/types";
import { getBackendUrl } from "@/shared/api/backend";
import type { ApiSuccessResponse } from "@/shared/api/types";

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

    if (!response.ok) {
      console.error(
        `Failed to load current user: ${response.status} ${response.statusText}`,
      );

      return null;
    }

    const result = (await response.json()) as ApiSuccessResponse<CurrentUser>;

    return result.data ?? null;
  } catch (error) {
    console.error("Failed to initialize current user", error);

    return null;
  }
}
