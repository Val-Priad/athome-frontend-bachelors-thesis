import { proxyBackendRequest } from "@/shared/api/proxy";

export async function GET(request: Request) {
  return proxyBackendRequest(request, "/api/auth/verify-email", {
    method: "GET",
  });
}
