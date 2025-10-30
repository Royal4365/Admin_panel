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
    const formattedOrders = orders.map((order: any) => {
      let totalAmount = order.total_amount;
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
