# Restaurant Management Admin Panel

A comprehensive, modern restaurant management system built with Next.js, TypeScript, Tailwind CSS, and NeonDB (PostgreSQL).

## Features

- 📊 **Dashboard**: Overview of customers, orders, and revenue with visual stats
- 👥 **Customer Management**: Add, view, and delete customers
- 🍽️ **Menu Management**: Full CRUD operations for menu items (name, price, category, availability)
- 💳 **Payments**: Track and manage payment transactions
- 🏪 **Restaurant Profile**: Manage restaurant information and online presence
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive Design**: Fully responsive across all devices
- 🎨 **Modern UI**: Clean, professional interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: NeonDB (PostgreSQL)
- **Icons**: Lucide React

## Project Structure

```
admin_panel/
├── app/
│   ├── api/              # API routes
│   │   ├── customers/    # Customer CRUD endpoints
│   │   ├── menu/         # Menu CRUD endpoints
│   │   └── init-db/      # Database initialization
│   ├── dashboard/        # Dashboard page
│   ├── customers/        # Customers page
│   ├── menu/             # Menu management page
│   ├── payments/         # Payments page
│   ├── profile/          # Restaurant profile page
│   ├── layout.tsx        # Root layout with Navbar & Sidebar
│   └── page.tsx          # Home page (redirects to dashboard)
├── components/
│   ├── Navbar.tsx        # Top navigation bar
│   ├── Sidebar.tsx       # Left sidebar menu
│   ├── StatCard.tsx      # Dashboard stat cards
│   └── AddCustomerModal.tsx  # Customer creation modal
├── lib/
│   ├── db.ts            # NeonDB connection & schema
│   ├── types.ts         # TypeScript interfaces
│   └── theme-context.tsx # Dark mode context
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A NeonDB account (free tier available at [neon.tech](https://neon.tech))

### Installation

1. **Clone/Navigate to the project directory**

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up your database**:

   - Create a new project on [NeonDB](https://console.neon.tech/)
   - Copy your connection string
   - Update the `.env.local` file with your NeonDB connection string:
     ```
     DATABASE_URL=postgresql://user:password@host/database?sslmode=require
     ```

4. **Initialize the database**:

   - Start the development server (next step)
   - Visit: `http://localhost:3000/api/init-db`
   - This will create all necessary tables automatically

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Open the app**:
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You'll be automatically redirected to the dashboard

## Database Schema

The application uses the following tables:

- **customers**: Store customer information (id, name, email, phone)
- **menu_items**: Store menu items (id, name, price, category, availability, description)
- **orders**: Track customer orders (id, customer_id, total_amount, status)
- **payments**: Track payments (id, order_id, amount, payment_method, status)

## API Endpoints

### Customers

- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a new customer
- `DELETE /api/customers?id={id}` - Delete a customer

### Menu Items

- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create a new menu item
- `PUT /api/menu?id={id}` - Update a menu item
- `DELETE /api/menu?id={id}` - Delete a menu item

### Database

- `GET /api/init-db` - Initialize database tables

## Features in Detail

### Dashboard

- Total customers count
- Today's orders
- Total revenue
- Recent activity feed
- Popular menu items
- Performance metrics

### Customer Management

- View all customers in a table
- Add new customers via modal
- Delete customers
- Customer statistics (total, new this month, active today)

### Menu Management

- View menu items in a grid layout
- Add/Edit/Delete menu items
- Categorize items (Appetizers, Main Course, Desserts, etc.)
- Toggle item availability
- Price management

### Dark Mode

- System preference detection
- Manual toggle in navbar
- Persistent across sessions (localStorage)
- Smooth transitions

## Customization

### Adding More Menu Categories

Edit `app/menu/page.tsx` and update the `categories` array:

```typescript
const categories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Your Category",
];
```

### Changing Theme Colors

Modify Tailwind configuration in `tailwind.config.ts` or use Tailwind's utility classes directly in components.

## Development Tips

- The app uses **dummy data** for the dashboard stats and payments initially
- To connect real data, modify the respective API calls in each page
- All database operations use prepared statements (SQL injection safe)
- The app supports hot reload - changes appear instantly

## Build for Production

```bash
npm run build
npm run start
```

## Troubleshooting

1. **Database connection errors**: Verify your `DATABASE_URL` in `.env.local`
2. **Tables not created**: Visit `/api/init-db` to initialize the database
3. **Port already in use**: Change the port with `npm run dev -- -p 3001`

## Future Enhancements

- User authentication & authorization
- Real-time order tracking
- Email notifications
- Analytics and reports
- Inventory management
- Multi-restaurant support
- Image uploads for menu items

## License

MIT License - Feel free to use this project for your restaurant!

## Support

For issues and questions, please check the Next.js documentation or NeonDB documentation.

---

**Enjoy managing your restaurant! 🍽️**
