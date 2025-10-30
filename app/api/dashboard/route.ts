import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";

// GET - Fetch dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    // Fetch active customers count
    const activeCustomersResult = await sql`
      SELECT COUNT(*) as count FROM customers 
      WHERE restaurant_id = ${restaurantId} AND status = 'Active'
    `;
    const activeCustomers = parseInt(activeCustomersResult[0].count);

    // Fetch today's orders count
    const todaysOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND DATE(created_at) = CURRENT_DATE
    `;
    const todaysOrders = parseInt(todaysOrdersResult[0].count);

    // Fetch today's revenue
    const todaysRevenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND DATE(created_at) = CURRENT_DATE
    `;
    const todaysRevenue = parseFloat(todaysRevenueResult[0].revenue);

    // Fetch weekly orders count
    const weeklyOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;
    const weeklyOrders = parseInt(weeklyOrdersResult[0].count);

    // Fetch weekly revenue
    const weeklyRevenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '7 days'
    `;
    const weeklyRevenue = parseFloat(weeklyRevenueResult[0].revenue);

    // Fetch monthly orders count
    const monthlyOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;
    const monthlyOrders = parseInt(monthlyOrdersResult[0].count);

    // Fetch monthly revenue
    const monthlyRevenueResult = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as revenue FROM orders 
      WHERE restaurant_id = ${restaurantId} 
      AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `;
    const monthlyRevenue = parseFloat(monthlyRevenueResult[0].revenue);

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
