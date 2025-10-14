import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // Parse JSON body with better error handling
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin with restaurant details
    const result = await sql`
      SELECT 
        a.id, 
        a.name,
        a.email, 
        a.phone,
        a.password, 
        a.restaurant_id, 
        r.name as restaurant_name,
        r.owner_name
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

    // Check password using bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return admin session data
    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        restaurantId: admin.restaurant_id,
        restaurantName: admin.restaurant_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
