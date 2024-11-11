import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
        console.log("fuck");

  try {
    const { email, otp } = await request.json();

    console.log("fuck")

    // Generate a unique key for each user, e.g., based on their email
    const userKey = `user:${email}`;

    const user = await redis.hgetall(userKey);

    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    console.log("hi")

    await redis.del(userKey);

    await connectDB();

    const newUser = await User.create({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });

    console.log(newUser);

    return NextResponse.json({ message: "User data stored successfully" });
  } catch (error) {
    console.error("Failed to store user data:", error);
    return NextResponse.json(
      { error: "Failed to store user data" },
      { status: 500 }
    );
  }
}
