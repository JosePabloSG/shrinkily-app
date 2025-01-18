import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware to handle authentication.
 * Redirects unauthenticated users to the sign-in page.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse|null>} Redirect response if unauthenticated, or null if authenticated.
 */
async function authMiddleware(req: NextRequest) {
  try {
    const session = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    if (session) {
      return null; // User is authenticated
    }

    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

/**
 * Middleware function to manage route access and authentication.
 * Allows access to public routes and static assets, while protecting private routes.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} The appropriate response based on authentication and route type.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Allow access to public auth routes
  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Protect all private routes
  const response = await authMiddleware(req);
  if (response) {
    return response;
  }

  return NextResponse.next();
}

/**
 * Configuration for the middleware matcher.
 * Defines the routes where the middleware should apply.
 */
export const config = {
  matcher: [
    "/auth/:path*", // Allow access to public auth routes
    "/dashboard/:path*", // Protect all private routes
  ],
};
