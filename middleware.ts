import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { urlFromServer } from "./server/middleware/redirect";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to static files and assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Handle URL shortener redirects
  if (
    pathname.length > 1 &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/dashboard")
  ) {
    try {
      const shortUrl = pathname.slice(1);
      const result = await urlFromServer(shortUrl);

      if (result.redirect404) {
        return NextResponse.redirect(new URL("/404", req.url));
      }

      if (result.error) {
        return NextResponse.redirect(new URL("/404", req.url));
      }

      if (result.url) {
        return NextResponse.redirect(new URL(result.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }

  // Handle auth routes
  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    try {
      const session = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
      });

      if (!session) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;
