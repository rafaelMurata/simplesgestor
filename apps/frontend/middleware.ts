import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Allow access to these routes without authentication
  const publicRoutes = ['/', '/api/auth/login', '/api/hello']
  if (publicRoutes.includes(path)) {
    return NextResponse.next()
  }

  // If there is no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If there is a token and the user is trying to access /auth/login or /auth/signup, redirect to /f/dashboard
  const authRoutes = ['/auth/login', '/auth/signup']
  if (authRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/f/dashboard', request.url))
  }

  // If there is a token, allow access to the page
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/login|auth/signup|api/auth/login|api/hello).*)',
  ],
}