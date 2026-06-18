import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/concepts/24-build-your-own.html", request.url));
}

export const config = {
  matcher: "/",
};
