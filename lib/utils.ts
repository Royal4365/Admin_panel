/**
 * Utility functions for the application
 */

/**
 * Format date to DD/MM/YYYY format
 * @param date - Date object or date string
 * @returns Formatted date string in DD/MM/YYYY format
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Format date and time to DD/MM/YYYY HH:MM format
 * @param date - Date object or date string
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const dateStr = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeStr = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${dateStr} ${timeStr}`;
}

/**
 * Format currency to Indian Rupees
 * @param amount - Amount to format
 * @returns Formatted currency string with ₹ symbol
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
