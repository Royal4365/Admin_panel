export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: "Active" | "Inactive";
  created_at: Date;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  discount?: number;
  menu_items?: string; // Comma-separated list of items for Thali
  type: "Veg" | "Non-Veg";
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: number;
  customer_id: number;
  total_amount: number;
  status: string;
  created_at: Date;
}

export interface Payment {
  id: number;
  order_id: number;
  customer_id: number;
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
  id: number;
  name: string;
  logo_url?: string;
  banner_url?: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface Admin {
  id: number;
  email: string;
  password: string;
  restaurant_id: number;
  created_at: Date;
}

export interface Restaurant {
  id: number;
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
