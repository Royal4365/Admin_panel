const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function checkMenuColumns() {
  try {
    console.log("\n📋 Checking menu_items table columns...\n");

    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'menu_items' 
      ORDER BY ordinal_position
    `;

    console.log("Available columns:");
    columns.forEach((col) => {
      const nullable = col.is_nullable === "YES" ? "(nullable)" : "(NOT NULL)";
      console.log(`  - ${col.column_name}: ${col.data_type} ${nullable}`);
    });

    // Check if hasDessert exists
    const hasDessert = columns.find(
      (col) =>
        col.column_name === "hasdessert" || col.column_name === "has_dessert"
    );

    if (hasDessert) {
      console.log("\n✅ Found dessert column:", hasDessert.column_name);
    } else {
      console.log("\n❌ No dessert-related column found");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkMenuColumns();
