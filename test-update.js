const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);
const RESTAURANT_ID = "aa139d05-8198-46d1-84e7-f6d1a6e9dbdd";

async function testUpdate() {
  try {
    console.log("\n🧪 Testing Restaurant Update...\n");

    // First, check what columns exist
    console.log("📋 Checking restaurants table columns...");
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'restaurants' 
      ORDER BY ordinal_position
    `;

    console.log(
      "Available columns:",
      columns.map((c) => c.column_name).join(", ")
    );

    // Try a simple update
    console.log("\n🔄 Attempting update...");
    const result = await sql`
      UPDATE restaurants
      SET 
        name = 'Pune Thali House',
        address = 'Test Address',
        phone = 'Test Phone',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${RESTAURANT_ID}
      RETURNING *
    `;

    if (result.length > 0) {
      console.log("✅ Update successful!");
      console.log("Updated restaurant:", result[0].name);
    } else {
      console.log("❌ No restaurant found with ID:", RESTAURANT_ID);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.column) {
      console.error("Problem column:", error.column);
    }
  }
}

testUpdate();
