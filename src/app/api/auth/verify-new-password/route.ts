import { proxyBackendRequest } from "@/shared/api/proxy";

export async function POST(request: Request) {
  return proxyBackendRequest(request, "/api/auth/verify-new-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: await request.text(),
    forwardRequestCookies: false,
    forwardResponseCookies: false,
  });
}
