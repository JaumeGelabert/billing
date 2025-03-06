import { NextResponse, type NextRequest } from "next/server";
import { type Session } from "@/auth";
import { betterFetch } from "@better-fetch/fetch";

const publicRoutes = ["/"];

export default async function authMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  const { data: session } = await betterFetch<Session>("api/auth/get-session", {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      cookie: req.headers.get("cookie") || ""
    }
  });

  if (!session) {
    if (isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|(?:.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|woff2?|css|js|map)$)).*)"
};
