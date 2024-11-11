// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import { generateOtp } from "@/lib/otp"; // Make sure to use the correct path for your otp.ts file

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { email } = req.body;

//     console.log("here:",email)
//     // Generate OTP
//     const otp = generateOtp();

//     // Set up the transporter for nodemailer (server-side only)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER, // SMTP user from environment variables
//         pass: process.env.SMTP_PASS, // SMTP pass from environment variables
//       },
//     });

//     const mailOptions = {
//       from: process.env.SMTP_FROM, // Sender email
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP code is: ${otp}`,
//     };

//     try {
//       // Send OTP email
//       await transporter.sendMail(mailOptions);

//       // Respond with success
//       res.status(200).json({ message: "OTP sent successfully", otp });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Failed to send OTP email", error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
