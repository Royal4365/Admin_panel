export interface Customer {
  id: string; // UUID
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: "Active" | "Inactive";
  created_at: Date;
  orders?: Order[]; // Add orders array
}

export interface MenuItem {
  id: string; // UUID
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  hasDessert?: boolean; // Indicates if dessert is included
  discount?: number;
  menu_items?: string; // Comma-separated list of items for Thali
  type: "Veg" | "Non-Veg";
  image_url?: string; // More readable name for frontend
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: number;
  user_id?: string;
  total_amount: number | string;
  status: string;
  created_at: Date;
  quantity: number;
  weeks: number;
  special_instructions?: string;
  updated_at: Date;
  menu_item_id?: number;
  restaurant_id?: number;
}

export interface Payment {
  id: string; // UUID
  order_id: string; // UUID
  customer_id: string; // UUID
  customer_name: string;
  customer_phone: string;
  amount: number;
  payment_method: string;
  status: "Paid" | "Pending";
  created_at: Date;
}

export interface DashboardStats {
  totalCustomers: number;
  todaysOrders: number;
  totalRevenue: number;
  activeCustomers?: number;
  dailyRevenue?: number;
  weeklyRevenue?: number;
  monthlyRevenue?: number;
}

export type FilterPeriod = "Daily" | "Weekly" | "Monthly";
export type CustomerStatus = "All" | "Active" | "Inactive";
export type PaymentStatus = "All" | "Paid" | "Pending";
export type MenuType = "All" | "Veg" | "Non-Veg";

export interface RestaurantProfile {
  id: string; // UUID
  name: string;
  logo_url?: string;
  banner_url?: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface Admin {
  id: string; // UUID
  email: string;
  password: string;
  restaurant_id: string; // UUID
  created_at: Date;
}

export interface Restaurant {
  id: string; // UUID
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cuisine_type: string;
  logo_url?: string;
  banner_url?: string;
  restaurant_picture_url?: string;
  description?: string;
  tagline?: string;
  website?: string;
  opening_hours?: string;
  delivery_time?: string;
  delivery_radius?: string;
  created_at: Date;
  updated_at: Date;
}
