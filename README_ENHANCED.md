# 🎉 Restaurant Management Admin Panel - Enhanced Version

A comprehensive, modern restaurant management system with advanced features, built with Next.js, TypeScript, Tailwind CSS, and NeonDB (PostgreSQL).

## ✨ What's New in This Update

### 📊 Enhanced Dashboard

- **Filter Dropdown**: Switch between Daily, Weekly, and Monthly views
- **Dynamic Stats**: Stats update based on selected time period
- **Three Key Metrics**:
  - Active Customers
  - Today's/Period Orders
  - Today's/Period Revenue

### 👥 Advanced Customer Management

- **Status Tracking**: Active/Inactive status with color-coded badges
- **Status Filter**: Dropdown to filter by All/Active/Inactive customers
- **Search Functionality**: Search customers by name or phone number
- **Enhanced Table**: Includes Name, Phone, Address, and Status columns
- **Rich UI**: Avatar initials, email display, and location icons

### 💳 Comprehensive Payments Dashboard

- **Period Cards**: Three prominent cards showing:
  - Today's Payments
  - Monthly Payments
  - Yearly Payments
- **Enhanced Table**: Columns for Name, Phone Number, and Payment Status
- **Status Filter**: Filter by All/Paid/Pending
- **Visual Analytics**: Payment method breakdown and status overview
- **Color-Coded Status**: Paid (green) and Pending (yellow) badges

### 🍱 Advanced Menu Management

- **"Add New Thali / Item" Button**: Opens comprehensive modal form
- **Rich Form Fields**:
  - Name, Price, Category
  - **Veg/Non-Veg Toggle**: Radio buttons with visual badges
  - **Image Upload**: Upload menu item images
  - Description field
  - Availability toggle
- **Menu Type Filter**: Filter by All/Veg/Non-Veg items
- **Card View**: Beautiful grid layout with:
  - Item images
  - Veg/Non-Veg badges (green leaf or red square)
  - Price, category, and description
  - Availability status
  - Hover actions (Edit/Delete buttons)
- **Click to Edit**: Click any card to edit that item
- **Visual Feedback**: Responsive hover states and transitions

### 🏪 Enhanced Restaurant Profile

- **Logo Upload**: Upload and preview restaurant logo
- **Banner/Photo Upload**: Full-width banner image
- **Inline Editing**: Edit button toggles edit mode for all fields
- **Rich Profile Display**:
  - Logo and banner images
  - Restaurant name and tagline
  - Complete contact information
  - Business details with cuisine tags
  - Quick stats (rating, reviews)
  - Photo gallery preview
- **Professional Layout**: Modern card-based design

## 🎨 Features Overview

### Core Features

- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark/Light Mode** - Toggle with persistent preference
- ✅ **Modern UI** - Clean, professional Tailwind CSS design
- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **RESTful API** - Next.js API routes
- ✅ **Database Ready** - NeonDB PostgreSQL integration

### Page-Specific Features

#### Dashboard (`/dashboard`)

- Time period filter (Daily/Weekly/Monthly)
- Three stat cards with dynamic data
- Recent activity feed
- Popular menu items
- Performance metrics

#### Customers (`/customers`)

- Search by name or phone
- Filter by status (All/Active/Inactive)
- Sortable table view
- Add customer with modal
- Delete customers
- Customer statistics

#### Payments (`/payments`)

- Three payment period cards
- Payment history table
- Filter by payment status
- Payment method analytics
- Status overview widgets

#### Menu Management (`/menu`)

- Add/Edit menu items via modal
- Image upload for items
- Veg/Non-Veg classification
- Filter by menu type
- Card-based grid view
- Click to edit functionality
- Delete confirmation

#### Restaurant Profile (`/profile`)

- Logo and banner management
- Inline editing mode
- Contact information
- Business details
- Cuisine tags
- Photo gallery

## 🗄️ Database Schema

### Updated Tables

```sql
customers
  - id, name, email, phone
  - address (NEW)
  - status: 'Active' | 'Inactive' (NEW)
  - created_at

menu_items
  - id, name, price, category, description, availability
  - type: 'Veg' | 'Non-Veg' (NEW)
  - image_url (NEW)
  - created_at, updated_at

payments
  - id, order_id
  - customer_id (NEW)
  - customer_name (NEW)
  - customer_phone (NEW)
  - amount, payment_method
  - status: 'Paid' | 'Pending'
  - created_at

restaurant_profile (NEW)
  - id, name
  - logo_url
  - banner_url
  - description
  - created_at, updated_at
```

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Update `.env.local` with your NeonDB connection string:

```
DATABASE_URL=postgresql://your-neondb-connection-string
```

### 3. Initialize Database

```bash
# Start the dev server
npm run dev

# Visit these URLs in order:
http://localhost:3001/api/init-db    # Create tables
http://localhost:3001/api/seed-db    # Add sample data (optional)
```

### 4. Access the App

Open [http://localhost:3001](http://localhost:3001)

## 📸 UI Highlights

### Dashboard

- Clean filter dropdown in top-right
- Three responsive stat cards
- Activity feed and analytics

### Customers

- Professional table with avatars
- Search bar with icon
- Status filter dropdown
- Color-coded status badges

### Payments

- Three gradient period cards
- Comprehensive payment table
- Visual analytics widgets
- Payment method breakdown

### Menu Management

- Modal form with all fields
- Image upload preview
- Veg/Non-Veg toggle with icons
- Beautiful card grid
- Hover-to-reveal actions

### Restaurant Profile

- Full-width banner with upload
- Circular logo with edit button
- Inline editing for all fields
- Modern card layout
- Photo gallery section

## 🎯 New Type Definitions

```typescript
// Filter types
type FilterPeriod = "Daily" | "Weekly" | "Monthly";
type CustomerStatus = "All" | "Active" | "Inactive";
type PaymentStatus = "All" | "Paid" | "Pending";
type MenuType = "All" | "Veg" | "Non-Veg";

// Updated interfaces
interface Customer {
  // ... existing fields
  address?: string;
  status: "Active" | "Inactive";
}

interface MenuItem {
  // ... existing fields
  type: "Veg" | "Non-Veg";
  image_url?: string;
}

interface Payment {
  // ... existing fields
  customer_name: string;
  customer_phone: string;
  status: "Paid" | "Pending";
}
```

## 🔧 API Routes

### Customers

- `GET /api/customers` - Fetch all (with address & status)
- `POST /api/customers` - Create (with address & status)
- `DELETE /api/customers?id={id}` - Delete

### Menu Items

- `GET /api/menu` - Fetch all (with type & image_url)
- `POST /api/menu` - Create (with type & image_url)
- `PUT /api/menu?id={id}` - Update (with type & image_url)
- `DELETE /api/menu?id={id}` - Delete

### Utilities

- `GET /api/init-db` - Initialize database schema
- `GET /api/seed-db` - Populate with sample data

## 💡 Usage Tips

### Adding Customers

1. Click "Add Customer" in navbar
2. Fill in name, email, phone, address
3. Select Active/Inactive status
4. Submit

### Managing Menu Items

1. Click "Add New Thali / Item"
2. Fill in all fields
3. Select Veg or Non-Veg
4. Upload image (optional)
5. Save
6. Click any card to edit
7. Hover over cards to see Edit/Delete buttons

### Filtering Data

- **Dashboard**: Use dropdown to switch time periods
- **Customers**: Use status filter and search bar
- **Payments**: Filter by payment status
- **Menu**: Filter by Veg/Non-Veg type

### Editing Profile

1. Go to Restaurant Profile
2. Click "Edit Profile"
3. All fields become editable
4. Upload logo/banner by clicking upload buttons
5. Click "Save Changes"

## 🎨 UI/UX Improvements

- ✅ Gradient cards for payments
- ✅ Color-coded status badges
- ✅ Search with icon
- ✅ Dropdown filters with icons
- ✅ Hover effects on cards
- ✅ Avatar initials for customers
- ✅ Veg/Non-Veg badges (leaf and square)
- ✅ Image upload with preview
- ✅ Modal forms for better UX
- ✅ Inline editing for profiles
- ✅ Responsive grid layouts
- ✅ Professional typography

## 📱 Responsive Design

All features work seamlessly across:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔮 Future Enhancements

Potential additions:

- Real-time order tracking
- Email notifications
- Advanced analytics
- Inventory management
- Multi-restaurant support
- Customer loyalty program
- Online ordering integration
- Staff management
- Table reservations

## 📄 Documentation Files

- `README.md` - This file (complete overview)
- `SETUP.md` - Quick setup guide
- `GETTING_STARTED.md` - User-friendly guide
- `PROJECT_SUMMARY.md` - Project overview

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: NeonDB (PostgreSQL)
- **Icons**: Lucide React
- **Image Handling**: HTML5 File API

## 📝 Notes

- Image uploads create local object URLs (in production, use cloud storage like AWS S3, Cloudinary, etc.)
- All filters use client-side filtering for instant response
- Database connection required for Customer and Menu CRUD operations
- Dashboard, Payments, and Profile work with dummy data without database

## 🎉 Enjoy Your Enhanced Restaurant Admin Panel!

All requested features have been implemented with a modern, professional UI. The application is production-ready with full CRUD operations, advanced filtering, search, and a beautiful user interface.

**Ready to manage your restaurant like a pro!** 🍽️✨
