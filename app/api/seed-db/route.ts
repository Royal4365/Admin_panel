import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    // Add sample customers
    await sql`
      INSERT INTO customers (name, email, phone, address, status) VALUES
      ('John Doe', 'john.doe@example.com', '+1 (555) 123-4567', '123 Oak Street, New York, NY 10001', 'Active'),
      ('Jane Smith', 'jane.smith@example.com', '+1 (555) 234-5678', '456 Maple Avenue, Brooklyn, NY 11201', 'Active'),
      ('Bob Johnson', 'bob.johnson@example.com', '+1 (555) 345-6789', '789 Pine Road, Queens, NY 11354', 'Inactive'),
      ('Alice Brown', 'alice.brown@example.com', '+1 (555) 456-7890', '321 Elm Drive, Manhattan, NY 10002', 'Active'),
      ('Charlie Wilson', 'charlie.wilson@example.com', '+1 (555) 567-8901', '654 Cedar Lane, Bronx, NY 10451', 'Active')
      ON CONFLICT (email) DO NOTHING
    `;

    // Add sample menu items
    await sql`
      INSERT INTO menu_items (name, price, category, description, availability, type, image_url) VALUES
      ('Margherita Pizza', 12.99, 'Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', true, 'Veg', null),
      ('Pepperoni Pizza', 14.99, 'Pizza', 'Traditional pepperoni with mozzarella cheese', true, 'Non-Veg', null),
      ('Caesar Salad', 8.99, 'Salads', 'Fresh romaine lettuce with Caesar dressing and croutons', true, 'Veg', null),
      ('Greek Salad', 9.99, 'Salads', 'Fresh vegetables with feta cheese and olives', true, 'Veg', null),
      ('Grilled Salmon', 18.99, 'Main Course', 'Atlantic salmon with vegetables and lemon butter sauce', true, 'Non-Veg', null),
      ('Chicken Alfredo', 15.99, 'Pasta', 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken', true, 'Non-Veg', null),
      ('Spaghetti Carbonara', 14.99, 'Pasta', 'Classic Italian pasta with bacon, eggs, and Parmesan', true, 'Non-Veg', null),
      ('Paneer Tikka Masala', 13.99, 'Main Course', 'Indian cottage cheese in creamy tomato sauce', true, 'Veg', null),
      ('Veg Thali', 16.99, 'Thali', 'Traditional Indian thali with variety of vegetarian dishes', true, 'Veg', null),
      ('Non-Veg Thali', 19.99, 'Thali', 'Traditional Indian thali with variety of non-vegetarian dishes', true, 'Non-Veg', null),
      ('Tiramisu', 6.99, 'Desserts', 'Classic Italian dessert with coffee-soaked ladyfingers', true, 'Veg', null),
      ('Chocolate Lava Cake', 7.99, 'Desserts', 'Warm chocolate cake with molten center', true, 'Veg', null),
      ('Bruschetta', 6.99, 'Appetizers', 'Toasted bread with tomatoes, garlic, and basil', true, 'Veg', null),
      ('Mozzarella Sticks', 7.99, 'Appetizers', 'Breaded and fried mozzarella with marinara sauce', true, 'Veg', null),
      ('Coca Cola', 2.99, 'Beverages', 'Classic cola drink', true, 'Veg', null),
      ('Fresh Orange Juice', 4.99, 'Beverages', 'Freshly squeezed orange juice', true, 'Veg', null),
      ('Espresso', 3.99, 'Beverages', 'Italian-style espresso coffee', true, 'Veg', null)
      ON CONFLICT DO NOTHING
    `;

    return NextResponse.json({
      success: true,
      message:
        "Sample data added successfully! You can now see customers and menu items.",
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
