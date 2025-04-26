import "next-auth"

declare module "next-auth" {
  interface User {
    accessToken: string
    planType: string
  }

  interface Session {
    accessToken: string
    user: {
      role: string
    } & DefaultSession["user"]
  }
}
