import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedMatchers = [
  "/admin",
  "/api/posts",
  "/api/uploads",
];

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedMatchers.some((matcher) => pathname.startsWith(matcher))) {
    return NextResponse.next();
  }

  if (!authSecret) {
    throw new Error("AUTH_SECRET or NEXTAUTH_SECRET must be set.");
  }

  const token = await getToken({ req: request, secret: authSecret });

  if (!token || token.role !== "ADMIN") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/posts/:path*",
    "/api/uploads/:path*",
  ],
};
