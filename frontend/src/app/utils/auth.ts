import { User } from "next-auth";

// Helper functions
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  // Implement OTP verification logic here
  // Return true if OTP is valid, false otherwise
  return true;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  // Fetch user from MongoDB by email
  return null;
}

export async function createUser(userData: {
  email: string;
  password: string;
  fullName: string;
}): Promise<User> {
  // Create new user in MongoDB
  return {
    id: "1",
    email: userData.email,
    name: userData.fullName,
  };
}
