import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./server/data-source";
import { getAccountByUserId } from "./server/utils/account";
import { getUserById } from "./server/utils/user";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  basePath: "/api/auth",
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  events: {
    /**
     * Event triggered when an account is linked to a user.
     * @param {Object} param0 - The event parameters.
     * @param {Object} param0.user - The user object.
     */
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    /**
     * Callback triggered when a user signs in.
     * @param {Object} param0 - The callback parameters.
     * @param {Object} param0.user - The user object.
     * @param {Object} param0.account - The account object.
     * @returns {Promise<boolean>} - Whether the sign-in is allowed.
     */
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const userRecord = await getUserById(user.id);

      if (!userRecord?.emailVerified) return false;

      return true;
    },
    /**
     * Callback triggered when a session is created.
     * @param {Object} param0 - The callback parameters.
     * @param {Object} param0.token - The JWT token.
     * @param {Object} param0.session - The session object.
     * @returns {Promise<Object>} - The updated session object.
     */
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.limitUrl = token.limitUrl as number;
      }

      return session;
    },
    /**
     * Callback triggered when a JWT is created or updated.
     * @param {Object} param0 - The callback parameters.
     * @param {Object} param0.token - The JWT token.
     * @returns {Promise<Object>} - The updated JWT token.
     */
    async jwt({ token }) {
      if (!token.sub) return token;

      const userRecord = await getUserById(token.sub);

      if (!userRecord) return token;

      const accountRecord = await getAccountByUserId(userRecord.id);

      token.isOAuth = !!accountRecord;
      token.name = userRecord.name;
      token.email = userRecord.email;
      token.limitUrl = userRecord.limitUrl;

      return token;
    },
  },
  ...authConfig,
});
