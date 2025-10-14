import { NextRequest } from "next/server";

export interface AdminSession {
  id: string;
  email: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
}

/**
 * Get restaurant ID from request headers
 * The client should send the restaurant ID in headers for API requests
 */
export function getRestaurantIdFromHeaders(
  request: NextRequest
): string | null {
  const restaurantId = request.headers.get("x-restaurant-id");
  return restaurantId;
}

/**
 * Validate that a restaurant ID is provided
 */
export function validateRestaurantId(restaurantId: string | null): string {
  if (!restaurantId) {
    throw new Error("Restaurant ID is required");
  }
  return restaurantId;
}
