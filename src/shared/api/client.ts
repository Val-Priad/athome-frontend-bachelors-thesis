import "client-only";

import { getBrowserCookie } from "@/shared/lib/browserCookies";

type ApiFetchOptions = RequestInit & {
  requiresCsrf?: boolean;
};

export async function apiFetch(
  input: RequestInfo | URL,
  options: ApiFetchOptions = {},
): Promise<Response> {
  const { requiresCsrf: csrf = false, headers, ...init } = options;
  const requestHeaders = new Headers(headers);

  if (csrf) {
    const csrfToken = getBrowserCookie("csrf_access_token");

    if (!csrfToken) {
      throw new Error("CSRF token is missing");
    }

    requestHeaders.set("X-CSRF-TOKEN", csrfToken);
  }

  return fetch(input, {
    ...init,
    headers: requestHeaders,
  });
}
