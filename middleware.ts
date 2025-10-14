import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public routes
  const publicRoutes = [
    "/login",
    "/signup",
    "/api/auth/login",
    "/api/auth/signup",
  ];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // For protected routes (dashboard and APIs), check if session exists in cookie
  // Since we're using localStorage on client side, we'll handle this differently
  // The middleware will mainly handle API route protection

  if (pathname.startsWith("/api/")) {
    // Allow API routes to handle their own auth
    return NextResponse.next();
  }

  // For dashboard routes, let the client-side handle redirect
  // This is because localStorage is client-side only
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
