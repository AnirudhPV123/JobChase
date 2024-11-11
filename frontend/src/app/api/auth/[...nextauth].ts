import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { verifyOTP, getUserByEmail, createUser } from "../../../utils/auth";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        fullName: { label: "Full Name", type: "text" },
      },
      async authorize(credentials) {
        // Verify OTP and create/update user
        const { email, password, otp, fullName } = credentials!;
        const isOTPValid = await verifyOTP(email, otp!);
        if (!isOTPValid) {
          throw new Error("Invalid OTP");
        }

        // Create or update user in MongoDB
        let user = await getUserByEmail(email);
        if (!user) {
          user = await createUser({ email, password, fullName: fullName! });
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
