import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";
import { Order } from "@/lib/types";

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const orders = await sql`
      SELECT * FROM orders WHERE restaurant_id = ${restaurantId} ORDER BY created_at DESC
    `;

    // Type assertion to ensure we can use map
    const ordersArray = orders as Array<Record<string, unknown>>;

    // Ensure total_amount is a number
    const formattedOrders = ordersArray.map((order) => {
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

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const body = await request.json();
    const { customer_id, total_amount, status } = body;

    if (!customer_id || total_amount === undefined) {
      return NextResponse.json(
        { error: "Customer ID and total amount are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO orders (restaurant_id, customer_id, total_amount, status)
      VALUES (${restaurantId}, ${customer_id}, ${total_amount}, ${
      status || "pending"
    })
      RETURNING *
    `;

    const order = (result as Array<Record<string, unknown>>)[0];

    // Ensure total_amount is a number
    let totalAmount: number | string = order.total_amount as number | string;
    if (typeof totalAmount === "string") {
      totalAmount = parseFloat(totalAmount);
    }
    order.total_amount = totalAmount;

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
