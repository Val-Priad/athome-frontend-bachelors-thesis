import { proxyBackendRequest } from "@/shared/api/proxy";

export async function POST(request: Request) {
  return proxyBackendRequest(request, "/api/auth/logout", {
    method: "POST",
  });
}
