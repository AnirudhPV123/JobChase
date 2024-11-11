// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";

// export const authOptions = {
//   providers: [
//     Providers.Email({
//       server: {
//         host: process.env.SMTP_HOST,
//         port: parseInt(process.env.SMTP_PORT as string),
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       },
//       from: process.env.SMTP_FROM,
//     }),
//   ],
//   session: {
//     jwt: true,
//   },
//   callbacks: {
//     async signIn(user) {
//       // Check if the user exists or not
//       await connectDB();
//       const existingUser = await User.findOne({ email: user.email });
//       if (existingUser) {
//         return true;
//       }
//       return false; // Don't sign in if user does not exist
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page
//     signup:"/auth/signup"
//   },
// };

// export default NextAuth(authOptions);
