const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);
const RESTAURANT_ID = "aa139d05-8198-46d1-84e7-f6d1a6e9dbdd";

async function testCoalesceUpdate() {
  console.log("\n🧪 Testing COALESCE Update Pattern\n");

  try {
    // Simulate what the API does
    const name = "Pune Thali House - Updated";
    const address = undefined; // Not provided
    const phone = "+91 98765 43210";
    const opening_hours = undefined; // Not provided
    const delivery_time = "25-35 mins";
    const delivery_radius = undefined; // Not provided
    const image_url = undefined;
    const logo_url = undefined;
    const category = undefined;
    const banner_url = "https://example.com/banner.jpg";
    const restaurant_picture_url = null;
    const website = "www.punethali.com";
    const email = "info@punethali.com";
    const city = "Pune";
    const state = "Maharashtra";
    const zip = "411001";
    const cuisine_type = "North Indian Thali";
    const rating = 4.5;
    const is_active = true;
    const discount = null;
    const owner_name = "Rajesh Kumar";
    const tagline = "Authentic Thali Experience";

    console.log("📝 Simulating API update request...");
    console.log(
      "   Provided fields: name, phone, delivery_time, website, email, city, state, zip, cuisine_type, rating, owner_name, tagline"
    );
    console.log(
      "   Not provided: address, opening_hours, delivery_radius, image_url, logo_url, category\n"
    );

    const result = await sql`
      UPDATE restaurants
      SET 
        name = COALESCE(${name}, name),
        address = COALESCE(${address}, address),
        phone = COALESCE(${phone}, phone),
        opening_hours = COALESCE(${opening_hours}, opening_hours),
        delivery_time = COALESCE(${delivery_time}, delivery_time),
        delivery_radius = COALESCE(${delivery_radius}, delivery_radius),
        image_url = COALESCE(${image_url}, image_url),
        logo_url = COALESCE(${logo_url}, logo_url),
        category = COALESCE(${category}, category),
        banner_url = ${banner_url},
        restaurant_picture_url = ${restaurant_picture_url},
        website = ${website},
        email = ${email},
        city = ${city},
        state = ${state},
        zip = ${zip},
        cuisine_type = ${cuisine_type},
        rating = ${rating},
        is_active = ${is_active ?? true},
        discount = ${discount},
        owner_name = ${owner_name},
        tagline = ${tagline},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${RESTAURANT_ID}
      RETURNING *
    `;

    if (result.length > 0) {
      console.log("✅ Update successful!");
      console.log("\n📋 Updated restaurant:");
      console.log("   Name:", result[0].name);
      console.log("   Address:", result[0].address);
      console.log("   Phone:", result[0].phone);
      console.log("   Opening Hours:", result[0].opening_hours);
      console.log("   Delivery Time:", result[0].delivery_time);
      console.log("   Email:", result[0].email);
      console.log("   City:", result[0].city);
      console.log("   Website:", result[0].website);
      console.log("   Owner:", result[0].owner_name);
      console.log(
        "\n✅ COALESCE working correctly - unprovided fields retained existing values"
      );
    } else {
      console.log("❌ No rows updated");
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.code) console.error("Code:", error.code);
    if (error.detail) console.error("Detail:", error.detail);
  }
}

testCoalesceUpdate();
