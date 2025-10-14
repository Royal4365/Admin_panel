const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function checkDatabase() {
  try {
    console.log("\n=== CHECKING DATABASE ===\n");

    // Get all tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;

    console.log("📋 EXISTING TABLES:");
    console.log(JSON.stringify(tables, null, 2));

    if (tables.length > 0) {
      console.log("\n📊 TABLE STRUCTURES:\n");

      for (const table of tables) {
        const tableName = table.table_name;
        console.log(`\n--- ${tableName.toUpperCase()} ---`);

        const columns = await sql`
          SELECT 
            column_name, 
            data_type, 
            is_nullable,
            column_default
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
            AND table_name = ${tableName}
          ORDER BY ordinal_position
        `;

        console.log(JSON.stringify(columns, null, 2));
      }
    } else {
      console.log("\n❌ No tables found in database");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  }
}

checkDatabase();
