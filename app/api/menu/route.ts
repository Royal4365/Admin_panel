import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET - Fetch all menu items
export async function GET() {
  try {
    const menuItems = await sql`
      SELECT * FROM menu_items ORDER BY category, name
    `;
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST - Create a new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      price,
      category,
      description,
      availability,
      type,
      image_url,
    } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO menu_items (name, price, category, description, availability, type, image_url)
      VALUES (${name}, ${price}, ${category}, ${description || null}, ${
      availability ?? true
    }, ${type || "Veg"}, ${image_url || null})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

// PUT - Update a menu item
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name,
      price,
      category,
      description,
      availability,
      type,
      image_url,
    } = body;

    const result = await sql`
      UPDATE menu_items
      SET 
        name = ${name},
        price = ${price},
        category = ${category},
        description = ${description || null},
        availability = ${availability ?? true},
        type = ${type || "Veg"},
        image_url = ${image_url || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a menu item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM menu_items WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
