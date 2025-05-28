import 'server-only';

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          if (!response.ok) return null;

          const { token, user } = await response.json();

          return {
            id: user.id.toString(),
            name: user.name || "",
            email: user.email || "",
            accessToken: token,
            planType: user.planType || "free"
          };

        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.planType = user.planType
        token.name = user.name
      }
      return token;
    },
     async session({ session, token }) {
    session.user.planType = token.planType as string
    session.user.name = token.name
    return session
  }

  }
});
