import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";
import { Customer } from "@/lib/types";

// GET - Fetch all users (customers)
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const users = await sql`
      SELECT 
        id,
        email,
        first_name,
        last_name,
        phone,
        address,
        status,
        created_at,
        COALESCE(name, first_name || ' ' || last_name) as name
      FROM users 
      ORDER BY created_at DESC
    `;

    // Type assertion to ensure we can use map
    const usersArray = users as Array<Record<string, unknown>>;

    // Transform data to match the Customer interface
    const customers = usersArray.map((user) => {
      // Type assertion to avoid any type while still allowing access to properties
      const userRecord = user as { [key: string]: unknown };
      return {
        id: userRecord.id as string,
        name: userRecord.name as string,
        email: userRecord.email as string,
        phone: userRecord.phone as string,
        address: userRecord.address as string,
        status: ((userRecord.status as string) || "Active") as
          | "Active"
          | "Inactive",
        created_at: userRecord.created_at as Date,
      };
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST - Create a new user (customer)
export async function POST(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const body = await request.json();
    const { name, email, phone, address, status } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const result = await sql`
      INSERT INTO users (first_name, last_name, email, phone, address, status, name)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone || null}, ${
      address || null
    }, ${status || "Active"}, ${name})
      RETURNING id, email, first_name, last_name, phone, address, status, created_at, name
    `;

    const user = (result as Array<Record<string, unknown>>)[0];
    const customer: Customer = {
      id: user.id as string,
      name: (user.name || `${user.first_name} ${user.last_name}`) as string,
      email: user.email as string,
      phone: user.phone as string,
      address: user.address as string,
      status: ((user.status as string) || "Active") as "Active" | "Inactive",
      created_at: user.created_at as Date,
    };

    return NextResponse.json(customer, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Check for duplicate email
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "23505"
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a user (customer)
export async function DELETE(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM users WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
