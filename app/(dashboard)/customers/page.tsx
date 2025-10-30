"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, Mail, Phone, MapPin, Search } from "lucide-react";
import { Customer, CustomerStatus, Order } from "@/lib/types";
import { authenticatedFetch } from "@/lib/client-auth";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<CustomerStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await authenticatedFetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await authenticatedFetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const filterCustomers = useCallback(() => {
    let filtered = [...customers];

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          (c.phone && c.phone.toLowerCase().includes(query))
      );
    }

    setFilteredCustomers(filtered);
  }, [customers, statusFilter, searchQuery]);

  useEffect(() => {
    Promise.all([fetchCustomers(), fetchOrders()]).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [filterCustomers]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await authenticatedFetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCustomers(customers.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Error deleting customer");
    }
  };

  // Get orders for a specific customer
  const getCustomerOrders = (customerId: string) => {
    return orders.filter((order) => order.user_id === customerId);
  };

  // Get payment status based on customer orders
  const getPaymentStatus = (customerId: string) => {
    const customerOrders = getCustomerOrders(customerId);
    if (customerOrders.length === 0) {
      return "No Orders";
    }

    // Check if any order is pending
    const hasPendingOrder = customerOrders.some(
      (order) => order.status === "pending"
    );
    if (hasPendingOrder) {
      return "Pending";
    }

    // Check if any order is completed
    const hasCompletedOrder = customerOrders.some(
      (order) => order.status === "completed"
    );
    if (hasCompletedOrder) {
      return "Paid";
    }

    return "Unknown";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600 dark:text-gray-400">
          Loading customers...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Customers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your restaurant customers
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as CustomerStatus)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white appearance-none pr-10 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
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

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {searchQuery || statusFilter !== "All"
                      ? "No customers match your filters."
                      : 'No customers found. Click "Add Customer" to add your first customer.'}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {customer.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="line-clamp-2">
                          {customer.address || "No address provided"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getPaymentStatus(customer.id) === "Paid"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                            : getPaymentStatus(customer.id) === "Pending"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                            : getPaymentStatus(customer.id) === "No Orders"
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                        }`}
                      >
                        {getPaymentStatus(customer.id)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Stats */}
      {customers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Customers
            </h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {customers.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Active Payment Status
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {customers.filter((c) => c.status === "Active").length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Inactive Payment Status
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {customers.filter((c) => c.status === "Inactive").length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
