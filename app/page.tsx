"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Utensils } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const session = localStorage.getItem("adminSession");

        if (session) {
          // User is logged in, redirect to dashboard
          router.push("/dashboard");
        } else {
          // User is not logged in, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      }
    };

    // Small delay to show loading animation
    setTimeout(checkAuth, 500);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 animate-pulse">
          <Utensils className="w-10 h-10 text-white" />
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Restaurant Admin Panel
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Loading your workspace...
        </p>
      </div>
    </div>
  );
}
