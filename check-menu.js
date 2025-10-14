const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function checkMenuItems() {
  try {
    const cols = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'menu_items' 
      ORDER BY ordinal_position
    `;

    console.log("\n=== MENU_ITEMS TABLE STRUCTURE ===\n");
    console.log(JSON.stringify(cols, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkMenuItems();
