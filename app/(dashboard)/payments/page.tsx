"use client";

import { useState } from "react";
import {
  DollarSign,
  CreditCard,
  Calendar,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { PaymentStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function PaymentsPage() {
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus>("All");

  // Dummy payment data
  const allPayments = [
    {
      id: 1,
      customer_name: "John Doe",
      customer_phone: "+1 (555) 123-4567",
      amount: 45.99,
      method: "Credit Card",
      status: "Paid" as const,
      date: "2025-10-13",
    },
    {
      id: 2,
      customer_name: "Jane Smith",
      customer_phone: "+1 (555) 234-5678",
      amount: 78.5,
      method: "Cash",
      status: "Paid" as const,
      date: "2025-10-13",
    },
    {
      id: 3,
      customer_name: "Bob Johnson",
      customer_phone: "+1 (555) 345-6789",
      amount: 125.0,
      method: "Debit Card",
      status: "Pending" as const,
      date: "2025-10-12",
    },
    {
      id: 4,
      customer_name: "Alice Brown",
      customer_phone: "+1 (555) 456-7890",
      amount: 32.0,
      method: "Credit Card",
      status: "Paid" as const,
      date: "2025-10-12",
    },
    {
      id: 5,
      customer_name: "Charlie Wilson",
      customer_phone: "+1 (555) 567-8901",
      amount: 89.99,
      method: "Digital Wallet",
      status: "Paid" as const,
      date: "2025-10-11",
    },
    {
      id: 6,
      customer_name: "Diana Prince",
      customer_phone: "+1 (555) 678-9012",
      amount: 54.25,
      method: "Credit Card",
      status: "Pending" as const,
      date: "2025-10-13",
    },
    {
      id: 7,
      customer_name: "Edward Norton",
      customer_phone: "+1 (555) 789-0123",
      amount: 92.75,
      method: "Cash",
      status: "Paid" as const,
      date: "2025-10-10",
    },
    {
      id: 8,
      customer_name: "Fiona Green",
      customer_phone: "+1 (555) 890-1234",
      amount: 67.5,
      method: "Debit Card",
      status: "Pending" as const,
      date: "2025-10-13",
    },
  ];

  const filteredPayments =
    paymentFilter === "All"
      ? allPayments
      : allPayments.filter((p) => p.status === paymentFilter);

  // Calculate stats
  const todayRevenue = allPayments
    .filter((p) => p.date === "2025-10-13" && p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyRevenue =
    allPayments
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.amount, 0) * 3.2; // Simulated monthly

  const yearlyRevenue = monthlyRevenue * 11.5; // Simulated yearly

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Payments
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage payment transactions
        </p>
      </div>

      {/* Payment Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">
                Today&apos;s Payments
              </p>
              <p className="text-3xl font-bold mt-2">
                ₹{todayRevenue.toFixed(2)}
              </p>
              <p className="text-xs mt-2 opacity-75">
                {
                  allPayments.filter(
                    (p) => p.date === "2025-10-13" && p.status === "Paid"
                  ).length
                }{" "}
                transactions
              </p>
            </div>
            <DollarSign className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Monthly Payments</p>
              <p className="text-3xl font-bold mt-2">
                ₹{monthlyRevenue.toFixed(2)}
              </p>
              <p className="text-xs mt-2 opacity-75 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18% from last month
              </p>
            </div>
            <Calendar className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Yearly Payments</p>
              <p className="text-3xl font-bold mt-2">
                ₹{yearlyRevenue.toFixed(2)}
              </p>
              <p className="text-xs mt-2 opacity-75 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +24% from last year
              </p>
            </div>
            <CheckCircle className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Payment History
        </h2>

        <div className="relative">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white appearance-none pr-10 cursor-pointer"
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
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

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No payments match your filter.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      #{payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {payment.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {payment.customer_phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        {payment.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === "Paid"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(payment.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Payment Methods
          </h3>
          <div className="space-y-3">
            {["Credit Card", "Cash", "Debit Card", "Digital Wallet"].map(
              (method) => {
                const count = allPayments.filter(
                  (p) => p.method === method
                ).length;
                const percentage = (count / allPayments.length) * 100;
                return (
                  <div key={method}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {method}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Status Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Paid
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Completed transactions
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {allPayments.filter((p) => p.status === "Paid").length}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pending
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Awaiting confirmation
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {allPayments.filter((p) => p.status === "Pending").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
