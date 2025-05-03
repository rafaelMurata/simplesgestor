import { NextResponse, type NextRequest } from "next/server";
import { auth } from './auth';

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (!req.cookies.has("/dash") && pathname.startsWith("/dash")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
