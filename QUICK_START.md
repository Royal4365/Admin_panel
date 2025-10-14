# 🚀 Quick Start Guide - Restaurant Admin Panel

## ✨ What's New

Your admin panel now has a complete authentication system! Each restaurant owner can:

- Register their restaurant
- Login to their personalized dashboard
- Manage their own customers, menu, orders, and payments
- Complete data isolation between restaurants

---

## 🏁 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 2. Create Your First Restaurant Account

1. Click **"Get Started"** on the homepage
2. Fill in your restaurant details:
   - Restaurant name
   - Your name (owner)
   - Email & phone
   - Full address
   - Cuisine type (optional)
3. Set a password (min 6 characters)
4. Click **"Create Account"**
5. You'll be automatically logged into your dashboard!

### 3. Explore Your Dashboard

After login, you have access to:

- **Dashboard**: Overview stats & analytics
- **Customers**: Manage customer database
- **Payments**: Track payment history
- **Menu Management**: Add/edit menu items
- **Restaurant Profile**: Update your restaurant info

### 4. Logout

Click the red logout icon (🚪) in the top-right navbar.

---

## 🎯 Key Features

### Landing Page

- Modern design with hero section
- Feature showcase
- Call-to-action buttons
- Fully responsive
- Dark/Light mode support

### Authentication

- Secure signup with restaurant registration
- Email/password login
- Session persistence
- Auto-redirect if already logged in
- Logout functionality

### Dashboard (Protected)

- Restaurant-specific data
- Same powerful features as before
- Multi-tenant architecture
- Data isolation between restaurants

---

## 📁 Important Files

| File                   | Purpose                   |
| ---------------------- | ------------------------- |
| `app/page.tsx`         | Landing page              |
| `app/signup/page.tsx`  | Restaurant registration   |
| `app/login/page.tsx`   | Admin login               |
| `app/(dashboard)/*`    | Protected dashboard pages |
| `app/api/auth/*`       | Authentication APIs       |
| `lib/auth-context.tsx` | Session management        |

---

## 🗄️ Database Setup

### Initialize Database Tables

The database schema includes:

- `restaurants` - Restaurant information
- `admins` - Admin login credentials
- `customers` - Restaurant-specific customers
- `menu_items` - Restaurant-specific menu
- `orders` - Restaurant-specific orders
- `payments` - Restaurant-specific payments

All data is filtered by `restaurant_id` for complete isolation.

---

## 🔒 Security Warning

⚠️ **IMPORTANT**: Currently using plain-text passwords for development.

**Before going to production, you MUST:**

1. Install bcrypt: `npm install bcrypt`
2. Hash passwords in signup API
3. Compare hashed passwords in login API
4. Add proper session management (JWT/cookies)
5. Implement rate limiting
6. Add email verification

See `AUTH_SYSTEM.md` for detailed security guidelines.

---

## 🧪 Test the System

### Create Test Account:

- Restaurant: "Test Cafe"
- Owner: "John Doe"
- Email: "test@cafe.com"
- Password: "test123"

### Login:

- Email: "test@cafe.com"
- Password: "test123"

### Try Creating Another Restaurant:

- Use different email
- Get separate dashboard
- Data is completely isolated

---

## 🎨 Theme System

Dark/Light mode toggle works throughout:

- Landing page
- Login/Signup pages
- Dashboard pages
- Smooth transitions
- Persists preference

---

## 📱 Responsive Design

Fully responsive:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1920px+)

---

## 🚀 Next Steps

1. **Set up NeonDB**: Add real DATABASE_URL to `.env.local`
2. **Test Signup**: Create a restaurant account
3. **Test Login**: Login with credentials
4. **Add Data**: Add customers, menu items
5. **Test Logout**: Verify session clears
6. **Multi-tenant Test**: Create second restaurant, verify data isolation

---

## 📖 Documentation

- `AUTH_SYSTEM.md` - Complete authentication documentation
- `THEME_SYSTEM.md` - Theme system documentation
- `DARK_MODE_FIXED.md` - Dark mode implementation
- `THEME_FIX_STEPS.md` - Troubleshooting guide

---

## ❓ Common Questions

**Q: Can I use this without a database?**
A: No, authentication requires database for storing users and restaurant data.

**Q: Is the password secure?**
A: Not yet - plain text for development. MUST hash before production.

**Q: Can multiple restaurants use same email?**
A: No, each email can only register one restaurant.

**Q: How do I add another admin for my restaurant?**
A: This feature is not implemented yet. Currently one admin per restaurant.

**Q: Can I delete my restaurant?**
A: Not implemented yet. You can create a delete endpoint.

---

## 🆘 Need Help?

Check these files:

- `AUTH_SYSTEM.md` - Full auth documentation
- `THEME_DEBUGGING.md` - Theme troubleshooting
- `DARK_MODE_FIXED.md` - Dark mode setup

---

**Happy Restaurant Managing!** 🍽️✨
