import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin with restaurant details
    const result = await sql`
      SELECT a.id, a.email, a.password, a.restaurant_id, r.name as restaurant_name
      FROM admins a
      JOIN restaurants r ON a.restaurant_id = r.id
      WHERE a.email = ${email}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const admin = result[0];

    // Check password (in production, use bcrypt!)
    if (admin.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      email: admin.email,
      restaurantId: admin.restaurant_id,
      restaurantName: admin.restaurant_name,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
