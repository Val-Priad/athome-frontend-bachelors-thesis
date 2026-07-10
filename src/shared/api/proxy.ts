import { NextResponse } from "next/server";
import { getBackendUrl } from "./backend";

export async function readJsonSafely(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

type ProxyBackendRequestOptions = RequestInit & {
  forwardRequestCookies?: boolean;
  forwardResponseCookies?: boolean;
};

function copySetCookieHeaders(
  fromResponse: Response,
  toResponse: NextResponse,
) {
  const headers = fromResponse.headers as Headers & {
    getSetCookie?: () => string[];
  };

  const setCookies = headers.getSetCookie?.();

  if (setCookies?.length) {
    for (const cookie of setCookies) {
      toResponse.headers.append("set-cookie", cookie);
    }

    return;
  }

  const setCookie = fromResponse.headers.get("set-cookie");

  if (setCookie) {
    toResponse.headers.append("set-cookie", setCookie);
  }
}

export async function proxyBackendRequest(
  request: Request,
  backendPath: string,
  options: ProxyBackendRequestOptions = {},
) {
  try {
    const {
      forwardRequestCookies = false,
      forwardResponseCookies = false,
      headers,
      ...init
    } = options;

    const requestUrl = new URL(request.url);
    const backendUrl = `${getBackendUrl()}${backendPath}${requestUrl.search}`;

    const backendRequestHeaders = new Headers(headers);

    if (forwardRequestCookies) {
      const cookie = request.headers.get("cookie");

      if (cookie) {
        backendRequestHeaders.set("cookie", cookie);
      }
    }

    const response = await fetch(backendUrl, {
      ...init,
      headers: backendRequestHeaders,
    });

    const data = await readJsonSafely(response);

    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    if (forwardResponseCookies) {
      copySetCookieHeaders(response, nextResponse);
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "internal_client_error",
          message: "Something went wrong.",
        },
      },
      { status: 500 },
    );
  }
}
