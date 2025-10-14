"use client";

import { useState } from "react";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import StatCard from "@/components/StatCard";
import { FilterPeriod } from "@/lib/types";

export default function DashboardPage() {
  const [filter, setFilter] = useState<FilterPeriod>("Daily");

  // Get stats based on filter (dummy data)
  const getStats = () => {
    switch (filter) {
      case "Daily":
        return {
          activeCustomers: 248,
          todaysOrders: 35,
          todaysRevenue: 1245.5,
        };
      case "Weekly":
        return {
          activeCustomers: 856,
          todaysOrders: 198,
          todaysRevenue: 8750.25,
        };
      case "Monthly":
        return {
          activeCustomers: 2450,
          todaysOrders: 872,
          todaysRevenue: 35890.75,
        };
      default:
        return {
          activeCustomers: 248,
          todaysOrders: 35,
          todaysRevenue: 1245.5,
        };
    }
  };

  const stats = getStats();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back! Here&apos;s your restaurant overview.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterPeriod)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100 bg-white text-slate-900 appearance-none pr-10 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Active Customers"
          value={stats.activeCustomers}
          icon={Users}
          trend="+12% from last period"
          trendUp={true}
        />
        <StatCard
          title={filter === "Daily" ? "Today's Orders" : `${filter} Orders`}
          value={stats.todaysOrders}
          icon={ShoppingCart}
          trend="+8% from last period"
          trendUp={true}
        />
        <StatCard
          title={filter === "Daily" ? "Today's Revenue" : `${filter} Revenue`}
          value={`₹${stats.todaysRevenue.toLocaleString("en-IN")}`}
          icon={DollarSign}
          trend="+15% from last period"
          trendUp={true}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            {
              action: "New order placed",
              customer: "John Doe",
              amount: "₹45.99",
              time: "5 min ago",
            },
            {
              action: "Payment received",
              customer: "Jane Smith",
              amount: "₹78.50",
              time: "12 min ago",
            },
            {
              action: "New customer registered",
              customer: "Bob Johnson",
              amount: "-",
              time: "25 min ago",
            },
            {
              action: "Order completed",
              customer: "Alice Brown",
              amount: "₹32.00",
              time: "1 hour ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {activity.action}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {activity.customer}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {activity.amount}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Popular Menu Items
          </h3>
          <div className="space-y-3">
            {[
              { name: "Margherita Pizza", orders: 45 },
              { name: "Caesar Salad", orders: 38 },
              { name: "Grilled Salmon", orders: 32 },
              { name: "Pasta Carbonara", orders: 28 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  {item.name}
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {item.orders} orders
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Performance
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-700 dark:text-slate-300">
                  Customer Satisfaction
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  94%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "94%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-700 dark:text-slate-300">
                  Order Completion
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  89%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "89%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-700 dark:text-slate-300">
                  Delivery Speed
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  87%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: "87%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
