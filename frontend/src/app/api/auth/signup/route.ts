import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { generateOtp, sendOtpEmail } from "@/lib/otp";

export async function POST(request) {
  try {
    const { email, password, fullName } = await request.json();

    // Generate a unique key for each user, e.g., based on their email
    const userKey = `user:${email}`;

    const otp = await generateOtp();

    // Store the user's data in Redis with a hash
    await redis.hmset(userKey, {
      email,
      password,
      fullName,
      otp,
    });

    await redis.expire(userKey, 300); // expires in 300 seconds

    console.log("User data stored successfully");

    // Send OTP to user's email
    await sendOtpEmail({email, otp});

    return NextResponse.json({ message: "User data stored successfully" });
  } catch (error) {
    console.error("Failed to store user data:", error);
    return NextResponse.json(
      { error: "Failed to store user data" },
      { status: 500 }
    );
  }
}
