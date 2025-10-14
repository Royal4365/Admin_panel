const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);
const RESTAURANT_ID = "aa139d05-8198-46d1-84e7-f6d1a6e9dbdd";

async function diagnoseRestaurant() {
  console.log("\n🔍 Restaurant Profile Diagnostic\n");

  try {
    // 1. Check if restaurant exists
    console.log("1️⃣  Checking if restaurant exists...");
    const restaurant = await sql`
      SELECT id, name, email, phone 
      FROM restaurants 
      WHERE id = ${RESTAURANT_ID}
    `;

    if (restaurant.length === 0) {
      console.log("❌ Restaurant NOT FOUND with ID:", RESTAURANT_ID);
      console.log("\n📋 Available restaurants:");
      const allRestaurants = await sql`
        SELECT id, name FROM restaurants LIMIT 5
      `;
      console.log(allRestaurants);
      return;
    }

    console.log("✅ Restaurant found:", restaurant[0].name);
    console.log("   ID:", restaurant[0].id);
    console.log("   Email:", restaurant[0].email);
    console.log("   Phone:", restaurant[0].phone);

    // 2. Try a simple update
    console.log("\n2️⃣  Attempting simple update...");
    const updateResult = await sql`
      UPDATE restaurants
      SET 
        name = ${restaurant[0].name},
        phone = ${restaurant[0].phone || "Updated Phone"},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${RESTAURANT_ID}
      RETURNING *
    `;

    if (updateResult.length > 0) {
      console.log("✅ Update successful!");
    } else {
      console.log("❌ Update returned no rows");
    }

    // 3. Check all columns
    console.log("\n3️⃣  Restaurant table columns:");
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'restaurants' 
      ORDER BY ordinal_position
    `;

    columns.forEach((col) => {
      console.log(
        `   - ${col.column_name} (${col.data_type}) ${
          col.is_nullable === "YES" ? "NULL" : "NOT NULL"
        }`
      );
    });

    // 4. Try full update with all fields
    console.log("\n4️⃣  Testing full update with all fields...");
    const fullUpdate = await sql`
      UPDATE restaurants
      SET 
        name = 'Pune Thali House',
        address = '123 Test Street',
        phone = '+91 9876543210',
        opening_hours = '10:00 AM - 10:00 PM',
        delivery_time = '30-45 mins',
        delivery_radius = '5 km',
        email = 'contact@punethali.com',
        city = 'Pune',
        state = 'Maharashtra',
        zip = '411001',
        cuisine_type = 'Indian',
        website = 'www.punethali.com',
        is_active = true,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${RESTAURANT_ID}
      RETURNING id, name, email
    `;

    if (fullUpdate.length > 0) {
      console.log("✅ Full update successful!");
      console.log("   Name:", fullUpdate[0].name);
      console.log("   Email:", fullUpdate[0].email);
    }

    console.log("\n✨ Diagnosis complete! Restaurant can be updated.\n");
  } catch (error) {
    console.error("\n❌ Error during diagnosis:");
    console.error("Message:", error.message);
    if (error.code) console.error("Code:", error.code);
    if (error.detail) console.error("Detail:", error.detail);
    console.error("\nFull error:", error);
  }
}

diagnoseRestaurant();
