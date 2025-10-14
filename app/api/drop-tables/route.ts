import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    // Drop tables in reverse order to avoid foreign key constraints
    await sql`DROP TABLE IF EXISTS payments CASCADE`;
    await sql`DROP TABLE IF EXISTS orders CASCADE`;
    await sql`DROP TABLE IF EXISTS menu_items CASCADE`;
    await sql`DROP TABLE IF EXISTS customers CASCADE`;
    await sql`DROP TABLE IF EXISTS admins CASCADE`;
    await sql`DROP TABLE IF EXISTS restaurants CASCADE`;

    return NextResponse.json({
      success: true,
      message: "All tables dropped successfully",
    });
  } catch (error) {
    console.error("Error dropping tables:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to drop tables",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
