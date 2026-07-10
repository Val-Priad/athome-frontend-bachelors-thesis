import { proxyBackendRequest } from "@/shared/api/proxy";

export async function POST(request: Request) {
  const body = await request.text();
  return proxyBackendRequest(request, "/api/auth/resend-verification-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    forwardRequestCookies: false,
    forwardResponseCookies: false,
  });
}
