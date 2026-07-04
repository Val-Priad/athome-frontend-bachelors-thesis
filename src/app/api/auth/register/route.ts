import { NextResponse } from "next/server";
import { getBackendUrl } from "@/shared/api/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${getBackendUrl()}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
