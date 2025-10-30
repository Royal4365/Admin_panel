import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    // Fetch active customers count
    const activeCustomersResult = await sql`
      SELECT COUNT(*) as count FROM customers 
      WHERE restaurant_id = ${restaurantId} AND status = 'Active'
    `;
    // Type assertion to ensure we can access the first element and count property
    const activeCustomersArray = activeCustomersResult as Array<
      Record<string, unknown>
    >;
    const activeCustomers = parseInt(activeCustomersArray[0].count as string);

    // Fetch today's orders count
    const todaysOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND DATE(created_at) = CURRENT_DATE
    `;
    const todaysOrdersArray = todaysOrdersResult as Array<
      Record<string, unknown>
    >;
    const todaysOrders = parseInt(todaysOrdersArray[0].count as string);

    // Fetch today's revenue
    const todaysRevenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND DATE(created_at) = CURRENT_DATE
    `;
    const todaysRevenueArray = todaysRevenueResult as Array<
      Record<string, unknown>
    >;
    const todaysRevenue = parseFloat(todaysRevenueArray[0].revenue as string);

    // Fetch weekly orders count
    const weeklyOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;
    const weeklyOrdersArray = weeklyOrdersResult as Array<
      Record<string, unknown>
    >;
    const weeklyOrders = parseInt(weeklyOrdersArray[0].count as string);

    // Fetch weekly revenue
    const weeklyRevenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;
    const weeklyRevenueArray = weeklyRevenueResult as Array<
      Record<string, unknown>
    >;
    const weeklyRevenue = parseFloat(weeklyRevenueArray[0].revenue as string);

    // Fetch monthly orders count
    const monthlyOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;
    const monthlyOrdersArray = monthlyOrdersResult as Array<
      Record<string, unknown>
    >;
    const monthlyOrders = parseInt(monthlyOrdersArray[0].count as string);

    // Fetch monthly revenue
    const monthlyRevenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;
    const monthlyRevenueArray = monthlyRevenueResult as Array<
      Record<string, unknown>
    >;
    const monthlyRevenue = parseFloat(monthlyRevenueArray[0].revenue as string);

    return NextResponse.json({
      activeCustomers,
      todaysOrders,
      todaysRevenue,
      weeklyOrders,
      weeklyRevenue,
      monthlyOrders,
      monthlyRevenue,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
