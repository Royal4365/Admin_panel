const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  "postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-morning-cloud-a1nlxgp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function migrateDatabase() {
  console.log("\n🔧 Starting Database Migration...\n");

  try {
    // Step 1: Add missing columns to restaurants table
    console.log("📝 Step 1: Adding missing columns to restaurants table...");

    await sql`
      ALTER TABLE restaurants 
      ADD COLUMN IF NOT EXISTS owner_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS email VARCHAR(255),
      ADD COLUMN IF NOT EXISTS city VARCHAR(100),
      ADD COLUMN IF NOT EXISTS state VARCHAR(100),
      ADD COLUMN IF NOT EXISTS zip VARCHAR(20),
      ADD COLUMN IF NOT EXISTS cuisine_type VARCHAR(255),
      ADD COLUMN IF NOT EXISTS logo_url TEXT,
      ADD COLUMN IF NOT EXISTS banner_url TEXT,
      ADD COLUMN IF NOT EXISTS restaurant_picture_url TEXT,
      ADD COLUMN IF NOT EXISTS website VARCHAR(255),
      ADD COLUMN IF NOT EXISTS tagline VARCHAR(255)
    `;
    console.log("✅ Added columns to restaurants table");

    // Step 2: Rename hours to opening_hours if needed
    console.log("\n📝 Step 2: Checking opening_hours column...");
    const checkColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'restaurants' 
        AND column_name = 'opening_hours'
    `;

    if (checkColumn.length === 0) {
      await sql`
        ALTER TABLE restaurants 
        RENAME COLUMN hours TO opening_hours
      `;
      console.log("✅ Renamed hours to opening_hours");
    } else {
      console.log("✅ opening_hours column already exists");
    }

    // Step 3: Add missing columns to menu_items table
    console.log("\n📝 Step 3: Adding missing columns to menu_items table...");

    await sql`
      ALTER TABLE menu_items 
      ADD COLUMN IF NOT EXISTS menu_items TEXT,
      ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'Veg',
      ADD COLUMN IF NOT EXISTS category VARCHAR(100)
    `;
    console.log("✅ Added columns to menu_items table");

    // Step 4: Make category_id nullable (check if exists first)
    console.log("\n📝 Step 4: Checking if category_id exists...");
    const categoryIdCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'menu_items' 
        AND column_name = 'category_id'
    `;

    if (categoryIdCheck.length > 0) {
      await sql`
        ALTER TABLE menu_items 
        ALTER COLUMN category_id DROP NOT NULL
      `;
      console.log("✅ category_id is now nullable");
    } else {
      console.log("✅ category_id does not exist, skipping");
    }

    // Step 5: Populate type field based on is_veg (check if is_veg exists)
    console.log("\n📝 Step 5: Checking if is_veg column exists...");
    const isVegCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'menu_items' 
        AND column_name = 'is_veg'
    `;

    if (isVegCheck.length > 0) {
      console.log("Populating type field from is_veg...");
      await sql`
        UPDATE menu_items 
        SET type = CASE 
          WHEN is_veg = true THEN 'Veg'
          ELSE 'Non-Veg'
        END
        WHERE type IS NULL
      `;
      console.log("✅ Populated type field");
    } else {
      console.log("✅ is_veg column does not exist, skipping type population");
    }

    // Step 6: Create admins table if not exists
    console.log("\n📝 Step 6: Creating admins table...");
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("✅ Admins table created");

    // Step 7: Create payments table if not exists
    console.log("\n📝 Step 7: Creating payments table...");
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
        order_id UUID REFERENCES orders(id),
        user_id UUID REFERENCES users(id),
        customer_name VARCHAR(255),
        customer_phone VARCHAR(20),
        amount NUMERIC(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("✅ Payments table created");

    // Step 8: Add restaurant_id and status to users table
    console.log(
      "\n📝 Step 8: Adding restaurant_id and status to users table..."
    );
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
      ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'Active',
      ADD COLUMN IF NOT EXISTS name VARCHAR(255)
    `;
    console.log("✅ Added columns to users table");

    // Step 9: Populate name from first_name and last_name
    console.log("\n📝 Step 9: Populating name field...");
    await sql`
      UPDATE users 
      SET name = first_name || ' ' || last_name 
      WHERE name IS NULL
    `;
    console.log("✅ Populated name field");

    // Step 10: Check if we need to rename user_id to customer_id in orders
    console.log("\n📝 Step 10: Checking orders table columns...");
    const orderColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'orders' 
        AND column_name = 'customer_id'
    `;

    if (orderColumns.length === 0) {
      await sql`
        ALTER TABLE orders 
        RENAME COLUMN user_id TO customer_id
      `;
      console.log("✅ Renamed user_id to customer_id in orders");
    } else {
      console.log("✅ customer_id column already exists in orders");
    }

    // Final: Get first restaurant ID for configuration
    console.log("\n📝 Getting restaurant information...");
    const restaurants = await sql`
      SELECT id, name FROM restaurants LIMIT 1
    `;

    console.log("\n\n🎉 Migration Completed Successfully!\n");

    if (restaurants.length > 0) {
      console.log("📋 Restaurant Information:");
      console.log(`   ID: ${restaurants[0].id}`);
      console.log(`   Name: ${restaurants[0].name}`);
      console.log("\n⚠️  IMPORTANT: Update the RESTAURANT_ID in these files:");
      console.log("   - app/api/restaurant/route.ts");
      console.log("   - app/api/menu/route.ts");
      console.log(`\n   Replace with: "${restaurants[0].id}"\n`);
    } else {
      console.log(
        "\n⚠️  No restaurants found. You may need to create one first.\n"
      );
    }
  } catch (error) {
    console.error("\n❌ Migration Error:", error);
    console.error(error);
    process.exit(1);
  }
}

// Run migration
migrateDatabase();
