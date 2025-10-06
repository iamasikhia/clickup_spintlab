import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { User } from "@/lib/db";
import { findUserByEmail } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = findUserByEmail(credentials.email);
        if (user && user.password === credentials.password) return user;

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // token.role is set in jwt callback
      const role = (token as { role?: string }).role ?? "client";
      return { ...session, user: { ...session.user, role } };
    },
    async jwt({ token, user }) {
      if (user) token.role = (user as User).role;
      return token;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
