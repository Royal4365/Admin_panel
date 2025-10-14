"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  restaurantId: number | null;
  restaurantName: string | null;
  login: (email: string, restaurantId: number, restaurantName: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem("admin_session");
    if (session) {
      try {
        const { restaurantId, restaurantName } = JSON.parse(session);
        setIsAuthenticated(true);
        setRestaurantId(restaurantId);
        setRestaurantName(restaurantName);
      } catch (error) {
        console.error("Invalid session data:", error);
        localStorage.removeItem("admin_session");
      }
    }
    setLoading(false);
  }, []);

  const login = (
    email: string,
    restaurantId: number,
    restaurantName: string
  ) => {
    const session = { email, restaurantId, restaurantName };
    localStorage.setItem("admin_session", JSON.stringify(session));
    setIsAuthenticated(true);
    setRestaurantId(restaurantId);
    setRestaurantName(restaurantName);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    setRestaurantId(null);
    setRestaurantName(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        restaurantId,
        restaurantName,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
