import { neon } from "@neondatabase/serverless";

// Get the database connection string from environment variable
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  // Return placeholder if DATABASE_URL is not set (for builds without DB)
  return url || "postgresql://placeholder@localhost/placeholder";
};

// Create a SQL query function
export const sql = neon(getDatabaseUrl());

// Database initialization function
export async function initDatabase() {
  try {
    // Create restaurants table
    await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        owner_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        cuisine_type VARCHAR(255),
        logo_url TEXT,
        banner_url TEXT,
        restaurant_picture_url TEXT,
        description TEXT,
        tagline VARCHAR(255),
        website VARCHAR(255),
        opening_hours VARCHAR(255),
        delivery_time VARCHAR(100),
        delivery_radius VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create admins table
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create customers table (restaurant-specific)
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        status VARCHAR(20) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create menu_items table (restaurant-specific)
    await sql`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        content TEXT,
        rating DECIMAL(3, 2),
        is_available BOOLEAN DEFAULT true,
        has_dessert BOOLEAN DEFAULT false,
        discount DECIMAL(5, 2),
        menu_items TEXT,
        type VARCHAR(20) DEFAULT 'Veg',
        "menu-image" TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create orders table (restaurant-specific)
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES customers(id),
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create payments table (restaurant-specific)
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
        order_id INTEGER REFERENCES orders(id),
        customer_id INTEGER REFERENCES customers(id),
        customer_name VARCHAR(255),
        customer_phone VARCHAR(20),
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
