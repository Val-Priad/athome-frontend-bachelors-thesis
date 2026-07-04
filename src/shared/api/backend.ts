export function getBackendUrl(): string {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not defined");
  }
  return backendUrl;
}
