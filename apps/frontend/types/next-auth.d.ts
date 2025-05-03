import "next-auth"
import { DefaultSession } from '@auth/core/types';

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
