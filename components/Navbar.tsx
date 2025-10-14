"use client";

import { Moon, Sun, UserPlus } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-slate-100 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-700 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Restaurant Admin
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Add Customer Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Add Customer</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
