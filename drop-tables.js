const { neon } = require("@neondatabase/serverless");

// Get the database connection string from environment variable
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  // Return placeholder if DATABASE_URL is not set (for builds without DB)
  return url || "postgresql://placeholder@localhost/placeholder";
};

// Create a SQL query function
const sql = neon(getDatabaseUrl());

async function dropTables() {
  try {
    // Drop tables in reverse order to avoid foreign key constraints
    await sql`DROP TABLE IF EXISTS payments CASCADE`;
    await sql`DROP TABLE IF EXISTS orders CASCADE`;
    await sql`DROP TABLE IF EXISTS menu_items CASCADE`;
    await sql`DROP TABLE IF EXISTS customers CASCADE`;
    await sql`DROP TABLE IF EXISTS admins CASCADE`;
    await sql`DROP TABLE IF EXISTS restaurants CASCADE`;

    console.log("All tables dropped successfully");
  } catch (error) {
    console.error("Error dropping tables:", error);
  }
}

dropTables();
