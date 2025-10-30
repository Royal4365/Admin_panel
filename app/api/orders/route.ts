import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const orders = await sql`
      SELECT * FROM orders WHERE restaurant_id = ${restaurantId} ORDER BY created_at DESC
    `;

    // Ensure total_amount is a number
    const formattedOrders = orders.map((order) => {
      // Type assertion to avoid any type while still allowing access to properties
      const orderRecord = order as { [key: string]: unknown };
      let totalAmount: number | string = orderRecord.total_amount as
        | number
        | string;
      if (typeof totalAmount === "string") {
        totalAmount = parseFloat(totalAmount);
      }

      return {
        ...order,
        total_amount: totalAmount,
      };
    });

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
