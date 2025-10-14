import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      restaurantName,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      cuisineType,
      password,
    } = body;

    // Validate required fields
    if (
      !restaurantName ||
      !ownerName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !password
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
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

    // Create restaurant
    const restaurant = await sql`
      INSERT INTO restaurants (
        name, owner_name, email, phone, address, city, state, zip, cuisine_type
      ) VALUES (
        ${restaurantName}, ${ownerName}, ${email}, ${phone}, ${address}, ${city}, ${state}, ${zip}, ${
      cuisineType || null
    }
      )
      RETURNING id, name
    `;

    const restaurantId = restaurant[0].id;

    // Create admin account (in production, hash the password!)
    await sql`
      INSERT INTO admins (email, password, restaurant_id)
      VALUES (${email}, ${password}, ${restaurantId})
    `;

    return NextResponse.json({
      success: true,
      restaurantId,
      restaurantName: restaurant[0].name,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
