"use client";

import { useState, useEffect } from "react";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import StatCard from "@/components/StatCard";
import { FilterPeriod } from "@/lib/types";
import { authenticatedFetch } from "@/lib/client-auth";

export default function DashboardPage() {
  const [filter, setFilter] = useState<FilterPeriod>("Daily");
  const [stats, setStats] = useState({
    activeCustomers: 0,
    todaysOrders: 0,
    todaysRevenue: 0,
    weeklyOrders: 0,
    weeklyRevenue: 0,
    monthlyOrders: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const response = await authenticatedFetch("/api/dashboard");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Get stats based on filter (real data)
  const getFilteredStats = () => {
    switch (filter) {
      case "Daily":
        return {
          activeCustomers: stats.activeCustomers,
          orders: stats.todaysOrders,
          revenue: stats.todaysRevenue,
        };
      case "Weekly":
        return {
          activeCustomers: stats.activeCustomers,
          orders: stats.weeklyOrders,
          revenue: stats.weeklyRevenue,
        };
      case "Monthly":
        return {
          activeCustomers: stats.activeCustomers,
          orders: stats.monthlyOrders,
          revenue: stats.monthlyRevenue,
        };
      default:
        return {
          activeCustomers: stats.activeCustomers,
          orders: stats.todaysOrders,
          revenue: stats.todaysRevenue,
        };
    }
  };

  const filteredStats = getFilteredStats();

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading dashboard...
        </div>
      </div>
    );
  }

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
          value={filteredStats.activeCustomers}
          icon={Users}
          trend="+12% from last period"
          trendUp={true}
        />
        <StatCard
          title={filter === "Daily" ? "Today's Orders" : `${filter} Orders`}
          value={filteredStats.orders}
          icon={ShoppingCart}
          trend="+8% from last period"
          trendUp={true}
        />
        <StatCard
          title={filter === "Daily" ? "Today's Revenue" : `${filter} Revenue`}
          value={formatCurrency(filteredStats.revenue)}
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
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <p>Recent activity will be displayed here</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Popular Menu Items
          </h3>
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <p>Popular menu items will be displayed here</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Performance
          </h3>
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <p>Performance metrics will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
