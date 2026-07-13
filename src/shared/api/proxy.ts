import "server-only";

import { NextResponse } from "next/server";

import { getBackendUrl } from "./getBackendUrl";

type ProxyBackendRequestOptions = RequestInit & {
  forwardRequestCookies?: boolean;
  forwardResponseCookies?: boolean;
};

const FORWARDED_RESPONSE_HEADERS = [
  "content-type", // Preserves the JSON response format and character encoding.
  "retry-after", // Tells the client when to retry after rate limiting.
] as const;

const CSRF_PROTECTED_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function copyResponseHeaders(fromResponse: Response, toHeaders: Headers): void {
  for (const headerName of FORWARDED_RESPONSE_HEADERS) {
    const value = fromResponse.headers.get(headerName);

    if (value !== null) {
      toHeaders.set(headerName, value);
    }
  }
}

function copySetCookieHeaders(
  fromResponse: Response,
  toHeaders: Headers,
): void {
  for (const cookie of fromResponse.headers.getSetCookie()) {
    toHeaders.append("set-cookie", cookie);
  }
}

export async function proxyBackendRequest(
  request: Request,
  backendPath: string,
  options: ProxyBackendRequestOptions = {},
): Promise<NextResponse> {
  try {
    const {
      forwardRequestCookies = true,
      forwardResponseCookies = true,
      headers,
      ...init
    } = options;

    const requestUrl = new URL(request.url);
    const backendUrl = new URL(backendPath, getBackendUrl());

    backendUrl.search = requestUrl.search;

    const backendRequestHeaders = new Headers(headers);

    const cookie = request.headers.get("cookie");

    if (forwardRequestCookies && cookie) {
      backendRequestHeaders.set("cookie", cookie);
    }

    const method = (init.method ?? request.method).toUpperCase();
    const incomingCsrfToken = request.headers.get("X-CSRF-TOKEN");

    if (
      CSRF_PROTECTED_METHODS.has(method) &&
      incomingCsrfToken &&
      !backendRequestHeaders.has("X-CSRF-TOKEN")
    ) {
      backendRequestHeaders.set("X-CSRF-TOKEN", incomingCsrfToken);
    }

    const backendResponse = await fetch(backendUrl, {
      ...init,
      headers: backendRequestHeaders,
    });

    const responseHeaders = new Headers();

    copyResponseHeaders(backendResponse, responseHeaders);

    if (forwardResponseCookies) {
      copySetCookieHeaders(backendResponse, responseHeaders);
    }

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Backend proxy request failed", {
      method: options.method ?? request.method,
      backendPath,
      error,
    });

    return NextResponse.json(
      {
        error: {
          code: "backend_unavailable",
          message: "The service is temporarily unavailable.",
        },
      },
      {
        status: 502,
      },
    );
  }
}
