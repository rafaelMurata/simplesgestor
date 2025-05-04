import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/f/dashboard') || nextUrl.pathname.startsWith('/p/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/f/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;