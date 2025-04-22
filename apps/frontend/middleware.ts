import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  // Rotas protegidas
  const protectedRoutes = [
    '/paid/basic',
    '/paid/advanced',
    '/paid/premium'
  ];

  if (protectedRoutes.some(route => path.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}
