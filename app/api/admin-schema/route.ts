import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    // Get the schema of the admins table
    const result = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'admins'
      ORDER BY ordinal_position
    `;

    return NextResponse.json({
      success: true,
      columns: result,
    });
  } catch (error) {
    console.error("Error getting table schema:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get table schema",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
