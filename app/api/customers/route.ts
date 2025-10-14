import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET - Fetch all customers
export async function GET() {
  try {
    const customers = await sql`
      SELECT * FROM customers ORDER BY created_at DESC
    `;
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

// POST - Create a new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, status } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO customers (name, email, phone, address, status)
      VALUES (${name}, ${email}, ${phone || null}, ${address || null}, ${
      status || "Active"
    })
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating customer:", error);

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
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a customer
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM customers WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
