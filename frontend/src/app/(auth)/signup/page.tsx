// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { EyeIcon, EyeOffIcon, MoonIcon, SunIcon } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useRouter } from "next/navigation";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { signIn } from "next-auth/react";

// interface FormikValues {
//   fullName: string;
//   email: string;
//   password: string;
//   otp?: string;
// }

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Formik hook to manage form state
//   const formik = useFormik<FormikValues>({
//     initialValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       otp: "",
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required("Full name is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//       // otp: otpSent ? Yup.string().required("OTP is required") : Yup.string(),
//     }),
//     onSubmit: async (values) => {
//       if (!otpSent) {
//         await fetch("/api/auth/signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             fullName: values.fullName,
//             email: values.email,
//             password: values.password,
//           }),
//         });

//         setOtpSent(true);
//       } else {
//         await fetch("/api/auth/verify-otp", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: values.email,
//             otp,
//           }),
//         });
//       }
//     },
//   });

//   // Ensure the component only renders once fully mounted
//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <div className="flex justify-between">
//           <CardHeader>
//             <h1 className="text-2xl font-bold">Sign up</h1>
//           </CardHeader>
//           <CardHeader>
//             {theme === "dark" ? (
//               <Button variant="ghost" onClick={() => setTheme("light")}>
//                 <SunIcon className="h-4 w-4" />
//               </Button>
//             ) : (
//               <Button variant="ghost" onClick={() => setTheme("dark")}>
//                 <MoonIcon className="h-4 w-4" />
//               </Button>
//             )}
//           </CardHeader>
//         </div>
//         {!otpSent ? (
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 type="text"
//                 placeholder="john Doe"
//                 {...formik.getFieldProps("fullName")}
//               />
//               {formik.touched.fullName && formik.errors.fullName && (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.fullName}
//                 </div>
//               )}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 {...formik.getFieldProps("email")}
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.email}
//                 </div>
//               )}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="asdkfjlasdf"
//                   {...formik.getFieldProps("password")}
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                   onClick={togglePasswordVisibility}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOffIcon className="h-4 w-4 text-gray-500" />
//                   ) : (
//                     <EyeIcon className="h-4 w-4 text-gray-500" />
//                   )}
//                 </Button>
//               </div>
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-red-500 text-sm">
//                   {formik.errors.password}
//                 </div>
//               )}
//             </div>
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <span className="w-full border-t" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-background px-2 text-muted-foreground">
//                   Or continue with
//                 </span>
//               </div>
//             </div>
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => signIn("google")}
//             >
//               <svg
//                 className="mr-2 h-4 w-4"
//                 aria-hidden="true"
//                 focusable="false"
//                 data-prefix="fab"
//                 data-icon="google"
//                 role="img"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 488 512"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
//                 ></path>
//               </svg>
//               Google
//             </Button>
//           </CardContent>
//         ) : (
//           <div className="space-y-2">
//             <InputOTP
//               id="otp"
//               maxLength={6}
//               onChange={(value) => setOtp(value)}
//             >
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>
//           </div>
//         )}
//         <CardFooter className="flex flex-col space-y-4">
//           <Button
//             className="w-full"
//             type="button"
//             onClick={() => formik.handleSubmit()}
//           >
//             Sign up
//           </Button>
//           <p className="text-sm text-center text-muted-foreground">
//             Already have an account?{" "}
//             <Link href="/login" className="text-primary hover:underline">
//               Login
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const { data: session } = useSession();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignUp = async () => {
    setIsLoading(true);
    try {
      // Send OTP to user's email
      await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Sign up using credentials provider
      const { ok, error } = await signIn("credentials", {
        redirect: false,
        email,
        password,
        otp,
        fullName,
      });

      if (!ok) {
        setError(error);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Input
            type="text"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <Button onClick={handleEmailSignUp} disabled={isLoading}>
            {isLoading ? <Loading /> : "Sign Up with Email"}
          </Button>
          <Button onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? <Loading /> : "Sign Up with Google"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
