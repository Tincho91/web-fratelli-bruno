import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "./prisma";
import type { User } from "@prisma/client";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authConfig = {
  secret: authSecret,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        } satisfies Partial<User> & { role: User["role"] };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as User["role"]) ?? "USER";
      }

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as User).role;
        return token;
      }

      if (!token.sub) {
        return token;
      }

      const dbUser = await prisma.user.findUnique({ where: { id: token.sub } });

      if (dbUser) {
        token.role = dbUser.role;
      }

      return token;
    },
    authorized: async ({ auth, request }) => {
      const isAuthenticated = Boolean(auth?.user);
      const pathname = request.nextUrl.pathname;

      if (pathname.startsWith("/admin")) {
        return isAuthenticated && auth?.user?.role === "ADMIN";
      }

      return true;
    },
  },
} satisfies Parameters<typeof NextAuth>[0];

export const { handlers: authHandlers, auth, signIn, signOut } = NextAuth(authConfig);
