import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Routes that require authentication
const protectedPrefixes = ["/customer", "/worker", "/admin"];
// Routes that are public-only (redirect away if authenticated)
const publicOnlyRoutes = ["/login", "/signup"];

// Role-based route access map
const roleRouteMap: Record<string, string[]> = {
  CUSTOMER: ["/customer"],
  WORKER: ["/worker"],
  ADMIN: ["/admin"],
};

// Dashboard destinations by role
const dashboardMap: Record<string, string> = {
  CUSTOMER: "/customer/dashboard",
  WORKER: "/worker/dashboard",
  ADMIN: "/admin/dashboard",
};

async function decryptSession(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as { userId: string; role: string; expiresAt: string };
  } catch {
    return null;
  }
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Skip static assets and API routes
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".") // static files like .ico, .png
  ) {
    return NextResponse.next();
  }

  // Read session from cookie
  const sessionCookie = req.cookies.get("session")?.value;
  const session = sessionCookie ? await decryptSession(sessionCookie) : null;

  const isProtected = protectedPrefixes.some((prefix) =>
    path.startsWith(prefix)
  );
  const isPublicOnly = publicOnlyRoutes.includes(path);

  // Unauthenticated user trying to access protected route → redirect to login
  if (isProtected && !session?.userId) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user on public-only routes → redirect to their dashboard
  if (isPublicOnly && session?.userId && session?.role) {
    const destination = dashboardMap[session.role] || "/";
    return NextResponse.redirect(new URL(destination, req.nextUrl));
  }

  // Role-based access control: check if user's role can access this route prefix
  if (isProtected && session?.userId && session?.role) {
    const allowedPrefixes = roleRouteMap[session.role] || [];
    const hasAccess = allowedPrefixes.some((prefix) =>
      path.startsWith(prefix)
    );

    if (!hasAccess) {
      // Redirect to their own dashboard if they try to access another role's routes
      const destination = dashboardMap[session.role] || "/";
      return NextResponse.redirect(new URL(destination, req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
