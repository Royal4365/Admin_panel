/**
 * Get the current admin session from localStorage
 */
export function getAdminSession() {
  if (typeof window === "undefined") return null;

  try {
    const session = localStorage.getItem("adminSession");
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Error reading admin session:", error);
    return null;
  }
}

/**
 * Clear admin session
 */
export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("adminSession");
}

/**
 * Enhanced fetch that automatically includes restaurant ID in headers
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = getAdminSession();

  if (!session) {
    throw new Error("No admin session found");
  }

  const headers = new Headers(options.headers);
  headers.set("x-restaurant-id", session.restaurantId);
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    ...options,
    headers,
  });
}
