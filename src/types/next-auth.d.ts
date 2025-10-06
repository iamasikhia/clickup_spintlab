// src/types/next-auth.d.ts
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role: admin | freelancer | client */
      role?: "admin" | "freelancer" | "client";
    } & DefaultSession["user"];
  }
}
