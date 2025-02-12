import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { onBoardingMail } from "./lib/mail";
import getUserByEmail, { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Check if the user is signing in with OAuth
      if (account?.provider !== "credentials") {
        const existingUser = await getUserByEmail(user.email!);

        //if the user is new, and send the onboarding email
        if (!existingUser) {
          await onBoardingMail(user.email!, user.name || "");
        }

        return true;
      }

      // Handle credentials sign in
      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        const user = await getUserById(token.sub);
        session.user.name = user?.name || "USER";
        session.user.role = user?.role || "USER";
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        token.email = user.email;
      }

      // Add maxAge to the token
      const now = Math.floor(Date.now() / 1000);
      const maxAge = 60 * 60 * 2; // 2 Hours

      if (!token.exp || token.exp < now) {
        token.exp = now + maxAge;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
