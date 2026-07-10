import { proxyBackendRequest } from "@/shared/api/proxy";

export async function GET(request: Request) {
  return proxyBackendRequest(request, "/api/users/me", {
    method: "GET",
  });
}
