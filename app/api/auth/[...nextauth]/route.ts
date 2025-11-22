import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/app/lib/utils";
import { User } from "@/app/lib/models";
import clientPromise from "@/app/lib/mongodb-client";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: { strategy: "jwt" },

  providers: [
    /* -------------------- LOCAL LOGIN -------------------- */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDb();

        const found = await User.findOne({ email: credentials?.email });
        if (!found) throw new Error("No user found");

        const passOK = await bcrypt.compare(credentials!.password, found.password!);
        if (!passOK) throw new Error("Invalid password");

        return {
          id: found._id.toString(),
          email: found.email,
          name: found.name,
          image: found.photo,
        };
      },
    }),

    /* -------------------- GOOGLE -------------------- */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    /* -------------------- FACEBOOK -------------------- */
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,

  /* ========================================================
     CALLBACKS
   ======================================================== */
  callbacks: {
    /* -------------------- SIGN IN -------------------- */
    async signIn({ user, account }) {
      if (!account) return true;

      // SOCIAL LOGIN: google/facebook
      if (account.provider === "google" || account.provider === "facebook") {
        await connectToDb();

        // Provider unique ID
        const providerId = account.providerAccountId;

        // 1. Try to find by providerId
        let existing = await User.findOne({ providerId });

        // 2. If not found by providerId, check by email
        if (!existing && user.email) {
          existing = await User.findOne({ email: user.email });
        }

        // 3. Create new user if not exists
        if (!existing) {
          existing = await User.create({
            name: user.name || "",
            email: user.email || null,
            photo: user.image || "",
            provider: account.provider,
            providerId: providerId,
          });
        }

        // Set returned user.id to internal MongoDB ID
        user.id = existing._id.toString();
      }

      return true;
    },

    /* -------------------- JWT TOKEN -------------------- */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /* -------------------- SESSION -------------------- */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
