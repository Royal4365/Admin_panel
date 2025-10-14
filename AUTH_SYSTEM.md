# 🔐 Authentication System Documentation

## Overview

Complete authentication system with restaurant registration, login, and multi-tenant dashboard support.

---

## 🏗️ System Architecture

### Database Schema

#### 1. **restaurants** table

Stores restaurant information for each admin.

```sql
- id (SERIAL PRIMARY KEY)
- name (Restaurant name)
- owner_name (Owner's full name)
- email (Contact email - unique)
- phone (Contact number)
- address, city, state, zip (Location)
- cuisine_type (Type of cuisine)
- logo_url, banner_url, restaurant_picture_url (Images)
- description, tagline, website, opening_hours (Details)
- created_at, updated_at (Timestamps)
```

#### 2. **admins** table

Stores admin login credentials linked to restaurants.

```sql
- id (SERIAL PRIMARY KEY)
- email (Login email - unique)
- password (Plain text - MUST hash in production!)
- restaurant_id (Foreign key → restaurants)
- created_at (Timestamp)
```

#### 3. **Multi-tenant Data Tables**

All data tables now have `restaurant_id` foreign key:

- `customers` - Restaurant-specific customers
- `menu_items` - Restaurant-specific menu
- `orders` - Restaurant-specific orders
- `payments` - Restaurant-specific payments

---

## 📂 File Structure

```
app/
├── (dashboard)/          # Protected dashboard routes
│   ├── layout.tsx        # Dashboard layout with auth check
│   ├── dashboard/        # Dashboard page
│   ├── customers/        # Customers page
│   ├── payments/         # Payments page
│   ├── menu/             # Menu management
│   └── profile/          # Restaurant profile
├── page.tsx              # Landing page
├── login/
│   └── page.tsx          # Login page
├── signup/
│   └── page.tsx          # Restaurant registration
└── api/
    └── auth/
        ├── login/        # Login API endpoint
        └── signup/       # Signup API endpoint

lib/
├── auth-context.tsx      # Authentication state management
├── theme-context.tsx     # Theme management
├── db.ts                 # Database connection & schema
└── types.ts              # TypeScript interfaces

components/
├── Navbar.tsx            # Top navbar with logout
└── Sidebar.tsx           # Sidebar navigation
```

---

## 🎯 Features

### 1. **Landing Page** (`/`)

- Hero section with CTA buttons
- Feature showcase (6 features)
- Responsive design with dark mode
- Redirects to dashboard if already logged in

### 2. **Signup** (`/signup`)

- Restaurant information form:
  - Restaurant name
  - Owner name
  - Email & phone
  - Full address (street, city, state, ZIP)
  - Cuisine type (optional)
- Account security:
  - Password (min 6 characters)
  - Password confirmation
  - Show/hide password toggle
- Form validation with real-time error messages
- Auto-login after successful signup

### 3. **Login** (`/login`)

- Email & password authentication
- Show/hide password toggle
- Error handling
- Session persistence with localStorage
- Redirects to dashboard on success

### 4. **Dashboard Routes** (Protected)

- Authentication check on every page load
- Auto-redirect to login if not authenticated
- Restaurant-specific data filtering
- Same UI/UX as before, just with auth layer

### 5. **Session Management**

- localStorage-based sessions
- Stores:
  - Admin email
  - Restaurant ID
  - Restaurant name
- Automatic logout functionality
- Session validation on page load

---

## 🔄 Authentication Flow

### Signup Flow:

```
1. User fills signup form
2. POST /api/auth/signup
3. Create restaurant record
4. Create admin account
5. Return restaurantId & restaurantName
6. Store session in localStorage
7. Redirect to dashboard
```

### Login Flow:

```
1. User enters email/password
2. POST /api/auth/login
3. Verify credentials
4. Join admins + restaurants tables
5. Return session data
6. Store in localStorage
7. Redirect to dashboard
```

### Protected Route Access:

```
1. User navigates to dashboard page
2. Layout checks localStorage for session
3. If no session → redirect to /login
4. If session exists → render page
```

---

## 🚀 How to Use

### For Restaurant Owners:

#### **1. Sign Up**

1. Visit homepage
2. Click "Get Started" or "Sign Up"
3. Fill in restaurant details
4. Create password
5. Click "Create Account"
6. Automatically logged in to dashboard

#### **2. Login**

1. Visit homepage or `/login`
2. Enter email & password
3. Click "Login to Dashboard"
4. Access your personalized dashboard

#### **3. Logout**

1. Click the logout icon (🚪) in navbar
2. Confirm logout
3. Redirected to homepage

---

## 🔒 Security Notes

### ⚠️ IMPORTANT - Production Requirements:

#### **1. Password Hashing**

Currently using plain text passwords (FOR DEVELOPMENT ONLY!).

**MUST implement before production:**

```typescript
// Install bcrypt
npm install bcrypt
npm install --save-dev @types/bcrypt

// In signup route
import bcrypt from 'bcrypt';
const hashedPassword = await bcrypt.hash(password, 10);

// In login route
const isValid = await bcrypt.compare(password, admin.password);
```

#### **2. Session Management**

Currently using localStorage (basic).

**Recommended for production:**

- JWT tokens with httpOnly cookies
- Server-side session storage
- Redis for session management
- Proper CSRF protection

#### **3. Input Validation**

Add server-side validation:

- Email format validation
- Password strength requirements
- SQL injection prevention (using parameterized queries ✅)
- XSS protection

#### **4. Rate Limiting**

Implement rate limiting on auth endpoints:

```typescript
// Prevent brute force attacks
- Max 5 login attempts per 15 minutes
- Max 3 signup attempts per hour per IP
```

---

## 🎨 UI/UX Features

### Landing Page:

- Gradient hero section
- Feature grid with icons
- Call-to-action buttons
- Dark mode support
- Responsive design

### Auth Pages:

- Clean, modern design
- Form validation with error messages
- Loading states
- Password visibility toggle
- "Back to Home" navigation
- Dark mode support

### Dashboard:

- Protected routes
- Restaurant name in navbar
- Logout button
- Same feature-rich interface
- Multi-tenant data isolation

---

## 📊 Data Isolation

Each restaurant's data is completely isolated:

```typescript
// Example: Fetching customers for logged-in restaurant
const session = JSON.parse(localStorage.getItem("admin_session"));
const restaurantId = session.restaurantId;

const customers = await sql`
  SELECT * FROM customers 
  WHERE restaurant_id = ${restaurantId}
`;
```

**All data queries MUST filter by `restaurant_id`!**

---

## 🧪 Testing

### Test Signup:

1. Go to `http://localhost:3000`
2. Click "Get Started"
3. Fill form with test data:
   - Restaurant: "Test Cafe"
   - Owner: "John Doe"
   - Email: "test@cafe.com"
   - Password: "test123"
   - etc.
4. Submit
5. Should redirect to dashboard

### Test Login:

1. Go to `/login`
2. Email: "test@cafe.com"
3. Password: "test123"
4. Should login successfully

### Test Logout:

1. Click logout icon in navbar
2. Should redirect to homepage
3. Try accessing `/dashboard` - should redirect to login

---

## 🔧 API Endpoints

### POST `/api/auth/signup`

**Request Body:**

```json
{
  "restaurantName": "The Golden Spoon",
  "ownerName": "John Doe",
  "email": "owner@restaurant.com",
  "phone": "+91 12345 67890",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "zip": "400001",
  "cuisineType": "Italian, Indian",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}
```

**Response (Success):**

```json
{
  "success": true,
  "restaurantId": 1,
  "restaurantName": "The Golden Spoon"
}
```

### POST `/api/auth/login`

**Request Body:**

```json
{
  "email": "owner@restaurant.com",
  "password": "securepassword123"
}
```

**Response (Success):**

```json
{
  "success": true,
  "email": "owner@restaurant.com",
  "restaurantId": 1,
  "restaurantName": "The Golden Spoon"
}
```

---

## 📝 Next Steps

### Immediate Priorities:

1. ✅ Basic auth system working
2. ⏳ Hash passwords with bcrypt
3. ⏳ Add email verification
4. ⏳ Implement "Forgot Password"
5. ⏳ Add profile picture upload
6. ⏳ Admin settings page

### Future Enhancements:

- Two-factor authentication (2FA)
- OAuth integration (Google, Facebook)
- Role-based permissions (Admin, Staff, Manager)
- Activity logging
- Account deletion
- Export restaurant data

---

## 🐛 Troubleshooting

### Issue: "Email already registered"

**Solution**: Email must be unique. Use different email or login with existing account.

### Issue: Redirects to login even after signup

**Solution**: Check localStorage for `admin_session`. Clear it and try again.

### Issue: Can't access dashboard after login

**Solution**: Check browser console for errors. Verify session data exists.

### Issue: Database connection errors

**Solution**:

1. Check `.env.local` has valid DATABASE_URL
2. Run database initialization
3. Verify NeonDB is accessible

---

**Status**: ✅ Auth System Complete  
**Database**: ✅ Multi-tenant schema ready  
**Security**: ⚠️ Hash passwords before production  
**Ready to use**: ✅ Yes (with development warnings)
