import { NextResponse } from "next/server";
import { getBackendUrl } from "./backend";

async function readJsonSafely(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

export async function proxyBackendRequest(
  request: Request,
  backendPath: string,
  init: RequestInit = {},
) {
  try {
    const requestUrl = new URL(request.url);
    const backendUrl = `${getBackendUrl()}${backendPath}${requestUrl.search}`;

    const response = await fetch(backendUrl, init);
    const data = await readJsonSafely(response);

    return NextResponse.json(data, { status: response.status });
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
