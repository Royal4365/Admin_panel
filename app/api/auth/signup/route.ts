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

    const { name, email, phone, password, restaurantName } = body;

    // Validate required fields
    if (!name || !email || !phone || !password || !restaurantName) {
      return NextResponse.json(
        { error: "All required fields are required" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAdmin = await sql`
      SELECT id FROM admins WHERE email = ${email}
    `;

    if (existingAdmin.length > 0) {
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

    const restaurantId = restaurant[0].id;

    // Create admin account with hashed password and additional fields
    const adminResult = await sql`
      INSERT INTO admins (name, email, phone, password, restaurant_id)
      VALUES (${name}, ${email}, ${phone}, ${hashedPassword}, ${restaurantId})
      RETURNING id, email, restaurant_id
    `;

    const admin = adminResult[0];

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        restaurantId: admin.restaurant_id,
        restaurantName: restaurant[0].name,
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
