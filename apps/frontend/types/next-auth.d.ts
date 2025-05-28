import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    planType: string;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      planType: string;
      name?: string | null;
      email?: string | null;
    }& DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      planType: string;
    };
  }
}
