import "client-only";

type ApiFetchOptions = RequestInit & {
  requiresCsrf?: boolean;
};

function getBrowserCookie(name: string): string | null {
  const prefix = `${encodeURIComponent(name)}=`;

  for (const part of document.cookie.split(";")) {
    const cookie = part.trim();

    if (cookie.startsWith(prefix)) {
      return decodeURIComponent(cookie.slice(prefix.length));
    }
  }

  return null;
}

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
