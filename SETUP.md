# Quick Setup Guide

## Step 1: Get Your NeonDB Connection String

1. Go to [https://console.neon.tech/](https://console.neon.tech/)
2. Sign up or log in (free tier is perfect for this project)
3. Create a new project
4. Copy your connection string (looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

## Step 2: Update Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace the placeholder with your actual connection string:
   ```
   DATABASE_URL=postgresql://your-actual-connection-string-here
   ```

## Step 3: Initialize the Database

Once the server is running:

1. Open your browser and visit: `http://localhost:3001/api/init-db`
2. You should see a success message
3. This creates all the necessary tables (customers, menu_items, orders, payments)

## Step 4: Start Using the App

Navigate to `http://localhost:3001` and you'll see:

- **Dashboard** - Overview with stats (uses dummy data initially)
- **Customers** - Click "Add Customer" to add your first customer
- **Menu Management** - Click "Add Menu Item" to add items
- **Payments** - View payment transactions (dummy data)
- **Restaurant Profile** - Edit your restaurant information

## Testing the Features

### Add a Customer

1. Click "Add Customer" in the top navbar
2. Fill in name, email, and phone
3. Submit - the customer appears in the Customers page

### Add a Menu Item

1. Go to Menu Management
2. Click "Add Menu Item"
3. Fill in details (name, price, category, description)
4. Submit - the item appears in the menu grid

### Toggle Dark Mode

Click the sun/moon icon in the navbar to switch themes!

## Troubleshooting

**Error connecting to database?**

- Make sure your `DATABASE_URL` in `.env.local` is correct
- Check that your NeonDB project is active

**Tables not found?**

- Visit `/api/init-db` to create the tables

**Port already in use?**

- The app will automatically use the next available port (shown in terminal)

Enjoy your Restaurant Admin Panel! 🎉
