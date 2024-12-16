

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      phone: string;
      isVerified: boolean;
      address?: string | undefined;
    } & DefaultSession["user"];
  }
}
