import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getRestaurantIdFromHeaders, validateRestaurantId } from "@/lib/auth";

// GET - Fetch restaurant profile
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const restaurant = await sql`
      SELECT * FROM restaurants WHERE id = ${restaurantId} LIMIT 1
    `;

    if (restaurant.length === 0) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(restaurant[0]);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant profile" },
      { status: 500 }
    );
  }
}

// PUT - Update restaurant profile
export async function PUT(request: NextRequest) {
  try {
    const restaurantId = getRestaurantIdFromHeaders(request);
    validateRestaurantId(restaurantId);

    const body = await request.json();
    console.log("📝 Received update request:", body);

    const {
      name,
      address,
      phone,
      opening_hours,
      delivery_time,
      delivery_radius,
      image_url,
      logo_url,
      banner_url,
      restaurant_picture_url,
      website,
      email,
      city,
      state,
      zip,
      cuisine_type,
      rating,
      is_active,
      category,
      discount,
      owner_name,
    } = body;

    console.log("🔄 Updating restaurant with ID:", restaurantId);

    const result = await sql`
      UPDATE restaurants
      SET 
        name = COALESCE(${name}, name),
        address = COALESCE(${address}, address),
        phone = COALESCE(${phone}, phone),
        opening_hours = COALESCE(${opening_hours}, opening_hours),
        delivery_time = COALESCE(${delivery_time}, delivery_time),
        delivery_radius = COALESCE(${delivery_radius}, delivery_radius),
        restaurant_picture_url = COALESCE(${
          image_url || restaurant_picture_url
        }, restaurant_picture_url),
        logo_url = COALESCE(${logo_url}, logo_url),
        category = COALESCE(${category}, category),
        banner_url = ${banner_url},
        website = ${website},
        email = ${email},
        city = ${city},
        state = ${state},
        zip = ${zip},
        cuisine_type = ${cuisine_type},
        rating = ${rating},
        is_active = ${is_active ?? true},
        discount = ${discount},
        owner_name = ${owner_name},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${restaurantId}
      RETURNING *
    `;

    console.log(
      "✅ Update result:",
      result.length > 0 ? "Success" : "No rows updated"
    );

    if (result.length === 0) {
      console.error("❌ Restaurant not found with ID:", restaurantId);
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    console.log("✅ Restaurant updated successfully:", result[0].name);
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("❌ Error updating restaurant:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to update restaurant profile",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
