import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    planType: string;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
