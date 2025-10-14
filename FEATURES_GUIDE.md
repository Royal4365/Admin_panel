# 🎯 Quick Features Guide

## 📊 Dashboard Page

### Filter Dropdown

**Location**: Top-right corner  
**Options**: Daily | Weekly | Monthly  
**Effect**: Updates all three stat cards

### Stat Cards

1. **Active Customers** - Shows customer count for selected period
2. **Today's/Period Orders** - Shows order count
3. **Today's/Period Revenue** - Shows revenue amount

**Features**:

- Dynamic updates based on filter
- Trend indicators (+12%, +8%, +15%)
- Color-coded icons

---

## 👥 Customers Page

### Search Bar

**Location**: Top-left  
**Icon**: 🔍 Search icon  
**Functionality**: Real-time search by name OR phone

### Status Filter

**Location**: Top-right  
**Options**: All Status | Active | Inactive  
**Effect**: Filters customer list

### Table Columns

1. **Name** - With avatar initial + email
2. **Phone Number** - With phone icon
3. **Address** - With location icon
4. **Status** - Color-coded badge
   - 🟢 Active (green)
   - 🔴 Inactive (red)
5. **Actions** - Delete button

### Add Customer Button

**Location**: Navbar (top)  
**Form Fields**:

- Name \* (required)
- Email \* (required)
- Phone
- Address (textarea)
- Status (Active/Inactive dropdown)

---

## 💳 Payments Page

### Three Period Cards

**Layout**: Grid of 3 cards  
**Design**: Gradient backgrounds

1. **Today's Payments** (Green gradient)
   - Amount: $XXX.XX
   - Transaction count
2. **Monthly Payments** (Blue gradient)
   - Amount: $XXX.XX
   - Trend percentage
3. **Yearly Payments** (Purple gradient)
   - Amount: $XXX.XX
   - Trend percentage

### Payment Status Filter

**Location**: Top-right  
**Options**: All Payments | Paid | Pending

### Table Columns

1. ID
2. **Name** - Customer name
3. **Phone Number** - Customer phone
4. Amount
5. Payment Method (with credit card icon)
6. **Payment Status** - Color-coded badge
   - 🟢 Paid (green)
   - 🟡 Pending (yellow)
7. Date

### Analytics Widgets

- **Payment Methods**: Breakdown by method with progress bars
- **Status Overview**: Paid vs Pending counts

---

## 🍱 Menu Management Page

### Add New Thali / Item Button

**Location**: Top-right  
**Action**: Opens modal form

### Menu Type Filter

**Location**: Top-right (next to Add button)  
**Options**: All Items | Veg Only | Non-Veg Only

### Add/Edit Modal Form

**Fields**:

1. **Name** \* - Text input
2. **Price** \* - Number input (0.01 step)
3. **Category** \* - Dropdown
   - Appetizers, Main Course, Desserts, Beverages
   - Salads, Pizza, Pasta, **Thali**
4. **Veg / Non-Veg** \* - Radio toggle
   - 🌿 Veg (green badge)
   - 🔴 Non-Veg (red badge)
5. **Availability** - Dropdown (Available/Unavailable)
6. **Image Upload** - File picker
   - Shows preview thumbnail
7. **Description** - Textarea

**Buttons**: Cancel | Add Item (or Update Item)

### Menu Item Cards

**Card Layout**:

```
┌─────────────────────┐
│     [IMAGE]         │ ← Upload/placeholder
│   🌿 Veg Badge      │ ← Top-left overlay
│   ✏️ 🗑️             │ ← Top-right (on hover)
├─────────────────────┤
│ Item Name          │
│ $XX.XX     Category│
│ Description...     │
│ ✅ Available       │
└─────────────────────┘
```

**Interactions**:

- **Click card** → Opens edit modal
- **Hover card** → Shows Edit & Delete buttons
- **Click Edit** → Opens modal with data
- **Click Delete** → Confirms then deletes

**Card Features**:

- Image or placeholder
- Veg/Non-Veg badge (top-left)
- Name + Price
- Category tag
- Description (2 lines max)
- Availability status

---

## 🏪 Restaurant Profile Page

### Edit Mode Toggle

**Button**: Top-right  
**States**: "Edit Profile" ↔ "Save Changes"

### Logo Upload

**Location**: Bottom-right of circular logo  
**Icon**: 📤 Upload icon in blue circle  
**Visible**: Only in edit mode

### Banner Upload

**Location**: Bottom-right of banner area  
**Button**: White card with upload icon  
**Visible**: Only in edit mode

### Editable Sections

#### 1. Header Section

- **Logo** (circular, 128x128)
- **Banner** (full-width, 256px height)
- **Restaurant Name** (text input in edit mode)
- **Tagline** (text input in edit mode)

#### 2. Contact Information Card

- **Address** (street, city, state, ZIP)
- **Phone**
- **Email**
- **Website**

#### 3. Business Details Card

- **Opening Hours**
- **Cuisine Type** (shown as tags)
- **Quick Stats** (Rating, Reviews)

#### 4. About Section

- **Description** (textarea, 6 rows)

#### 5. Photo Gallery

- 4 placeholder squares
- Click to upload (in edit mode)

**Edit Mode Features**:

- All text fields become input boxes
- Upload buttons appear
- Gray background on inputs
- Border on textareas

---

## 🎨 Common UI Elements

### Status Badges

```
Active:    [🟢 Active]    - Green background
Inactive:  [🔴 Inactive]  - Red background
Paid:      [🟢 Paid]      - Green background
Pending:   [🟡 Pending]   - Yellow background
Available: [✅ Available] - Green background
```

### Veg/Non-Veg Badges

```
Veg:     [🌿 Veg]     - Green with leaf icon
Non-Veg: [🔴 Non-Veg] - Red with square icon
```

### Icons Used

- 🔍 Search
- 📞 Phone
- ✉️ Mail
- 📍 Map Pin
- 🕒 Clock
- 🏪 Store
- 💳 Credit Card
- ✅ Check
- ❌ X
- ✏️ Edit
- 🗑️ Trash
- 📤 Upload
- 🌿 Leaf

---

## 🎯 Quick Actions Cheat Sheet

| Page      | Quick Action  | Shortcut                     |
| --------- | ------------- | ---------------------------- |
| Dashboard | Change filter | Click dropdown top-right     |
| Customers | Search        | Type in search bar           |
| Customers | Filter status | Use status dropdown          |
| Customers | Add customer  | Click navbar button          |
| Payments  | Filter status | Use status dropdown          |
| Menu      | Add item      | Click "Add New Thali / Item" |
| Menu      | Edit item     | Click any card               |
| Menu      | Delete item   | Hover card → Click delete    |
| Menu      | Filter type   | Use Veg/Non-Veg dropdown     |
| Profile   | Edit mode     | Click "Edit Profile"         |
| Profile   | Upload logo   | Click logo upload button     |
| Profile   | Upload banner | Click banner upload button   |

---

## 🌓 Dark Mode

**Toggle Location**: Navbar (top-right, next to profile)  
**Icon**: 🌙 Moon (light mode) | ☀️ Sun (dark mode)  
**Persistence**: Saved to localStorage

**All new features support dark mode**:

- Cards adapt colors
- Text remains readable
- Badges maintain contrast
- Forms have dark backgrounds

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

**All features adapt**:

- Cards stack on mobile
- Tables scroll horizontally
- Filters move to top
- Modals center on screen

---

## ✨ Tips & Tricks

1. **Search while filtering** - Search and status filters work together
2. **Click to edit** - Cards in menu are clickable for quick edit
3. **Hover for actions** - Hover menu cards to reveal edit/delete
4. **Preview uploads** - Images show preview immediately
5. **Modal shortcuts** - Press ESC or click outside to close
6. **Filter persistence** - Filters stay active while navigating
7. **Quick stats** - Customer page shows count summaries
8. **Color coding** - Status badges use consistent colors

---

## 🚀 Power User Features

### Customers Page

- Search by partial name: "joh" finds "John"
- Search by phone: "555" finds all 555 numbers
- Combined filters: Search + Status filter work together

### Menu Page

- Click card anywhere to edit
- Image upload optional (shows placeholder)
- Category auto-suggests based on type

### Payments Page

- Period cards show trends
- Click column headers to sort (future feature)
- Payment methods chart shows distribution

---

Enjoy your enhanced Restaurant Admin Panel! 🎉
