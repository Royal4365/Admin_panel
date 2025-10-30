import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, restaurantName } = body;

    // Validate required fields
    if (!name || !email || !phone || !password || !restaurantName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAdmin = await sql`
      SELECT id FROM admins WHERE email = ${email}
    `;

    // Type assertion to ensure we can access length property
    const existingAdminArray = existingAdmin as Array<Record<string, unknown>>;

    if (existingAdminArray.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create restaurant with minimal required fields
    // Provide default values for all required columns
    const restaurant = await sql`
      INSERT INTO restaurants (
        name, 
        owner_name, 
        email, 
        phone, 
        address,
        city,
        state,
        zip,
        cuisine_type
      ) VALUES (
        ${restaurantName}, 
        ${name}, 
        ${email}, 
        ${phone}, 
        ${"Not specified"},
        ${"Not specified"},
        ${"Not specified"},
        ${"000000"},
        ${"Mixed"}
      )
      RETURNING id, name
    `;

    const restaurantId = (restaurant as Array<Record<string, unknown>>)[0]
      .id as number;

    // Create admin account with hashed password and additional fields
    const adminResult = await sql`
      INSERT INTO admins (name, email, phone, password, restaurant_id)
      VALUES (${name}, ${email}, ${phone}, ${hashedPassword}, ${restaurantId})
      RETURNING id, email, restaurant_id
    `;

    const admin = (adminResult as Array<Record<string, unknown>>)[0];

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id as string,
        email: admin.email as string,
        restaurantId: admin.restaurant_id as number,
        restaurantName: (restaurant as Array<Record<string, unknown>>)[0]
          .name as string,
        name: name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
