import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";

// GET - Fetch all menu items for the authenticated restaurant
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const menuItems = await sql`
      SELECT 
        id,
        restaurant_id,
        name,
        price,
        content,
        rating,
        is_available,
        has_dessert,
        menu_items,
        category,
        type,
        "menu-image" as image_url,
        created_at,
        updated_at
      FROM menu_items 
      WHERE restaurant_id = ${restaurantId}
      ORDER BY category, name
    `;

    // Transform data to match frontend expectations
    const transformedItems = menuItems.map((item: any) => ({
      ...item,
      price: parseFloat(item.price) || 0,
      rating: item.rating ? parseFloat(item.rating) : null,
      isAvailable: item.is_available ?? true,
      hasDessert: item.has_dessert ?? false,
      // If type field doesn't exist, default to Veg
      type: item.type || "Veg",
    }));

    return NextResponse.json(transformedItems);
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
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const body = await request.json();
    console.log("📝 Creating menu item with data:", body);

    const {
      name,
      price,
      category,
      type,
      isAvailable,
      hasDessert,
      discount,
      menu_items,
      image_url,
      rating,
    } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    // Convert type to is_veg boolean
    const is_veg = type === "Veg";

    // Use menu_items as content if available, otherwise use name
    const content = menu_items || name;

    console.log("🔄 Inserting menu item:", {
      name,
      price,
      category,
      type,
      content,
    });

    const result = await sql`
      INSERT INTO menu_items (
        restaurant_id,
        name, 
        price, 
        category,
        content,
        rating,
        is_available,
        has_dessert,
        menu_items,
        type,
        "menu-image"
      )
      VALUES (
        ${restaurantId},
        ${name}, 
        ${price}, 
        ${category},
        ${content},
        ${rating || null},
        ${isAvailable ?? true},
        ${hasDessert ?? false},
        ${menu_items || null},
        ${type || "Veg"},
        ${image_url || null}
      )
      RETURNING 
        id,
        restaurant_id,
        name,
        price,
        category,
        content,
        rating,
        is_available as "isAvailable",
        has_dessert as "hasDessert",
        menu_items,
        type,
        "menu-image" as image_url,
        created_at,
        updated_at
    `;

    console.log("✅ Menu item created successfully:", result[0].id);

    const item = result[0];
    // Ensure type is set
    if (!item.type) {
      item.type = "Veg";
    }
    // Ensure price is a number
    item.price = parseFloat(item.price) || 0;
    if (item.rating) {
      item.rating = parseFloat(item.rating);
    }

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating menu item:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to create menu item",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT - Update a menu item
export async function PUT(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("📝 Updating menu item:", id, body);

    const {
      name,
      price,
      category,
      type,
      isAvailable,
      hasDessert,
      discount,
      menu_items,
      image_url,
      rating,
    } = body;

    // Use menu_items as content if available, otherwise use name
    const content = menu_items || name;

    const result = await sql`
      UPDATE menu_items
      SET 
        name = ${name},
        price = ${price},
        category = ${category},
        content = ${content},
        rating = ${rating || null},
        is_available = ${isAvailable ?? true},
        has_dessert = ${hasDessert ?? false},
        menu_items = ${menu_items || null},
        type = ${type || "Veg"},
        "menu-image" = ${image_url || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND restaurant_id = ${restaurantId}
      RETURNING 
        id,
        restaurant_id,
        name,
        price,
        category,
        content,
        rating,
        is_available as "isAvailable",
        has_dessert as "hasDessert",
        menu_items,
        type,
        "menu-image" as image_url,
        created_at,
        updated_at
    `;

    console.log(
      "✅ Menu item updated successfully:",
      result.length > 0 ? result[0].id : "none"
    );

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    const item = result[0];
    // Ensure type is set
    if (!item.type) {
      item.type = "Veg";
    }
    // Ensure price is a number
    item.price = parseFloat(item.price) || 0;
    if (item.rating) {
      item.rating = parseFloat(item.rating);
    }

    return NextResponse.json(item);
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
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM menu_items 
      WHERE id = ${id} AND restaurant_id = ${restaurantId}
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
