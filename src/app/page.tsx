<<<<<<< HEAD
"use client";

import {
  LucideEye,
  LucideEyeOff,
  LucideLock,
  LucideMail,
  LucideMousePointerClick,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConnectingClickUp, setIsConnectingClickUp] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const response = await fetch("/api/auth/jwt/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("login data:", data);
      localStorage.setItem("accessToken", data.access_token);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleConnectClickUp = async () => {
    setError(null);

    const token = localStorage.getItem("accessToken");
    console.log("accessToken from localStorage:", token);

    if (!token) {
      setError("Please log in first.");
      return;
    }

    try {
      setIsConnectingClickUp(true);

      const response = await fetch("/api/clickup/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("clickup auth response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to connect ClickUp.");
      }
      const data = await response.json();

      window.location.href = data.auth_url;
    } catch (err) {
      console.error(err);
      setError("Failed to connect ClickUp.");
    } finally {
      setIsConnectingClickUp(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-cyan-200 p-4 light">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Invoice</h1>
        <p className="text-gray-600">
          Professional invoicing for freelancers and businesses
        </p>
      </div>

      {/* Sign Up Card */}
      <Card className="w-[480px] bg-white text-gray-900">
        <CardHeader className="flex items-center justify-center text-xl">
          <CardTitle className="">Connect your ClickUp Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-medium mb-2 block">
                Email
              </Label>
              <div className="relative">
                <LucideMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="font-medium mb-2 block">
                Password
              </Label>
              <div className="relative">
                <LucideLock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-50 border-gray-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <LucideEyeOff className="h-5 w-5" />
                  ) : (
                    <LucideEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <Button
            className="w-full mb-4 mt-4 bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]"
            type="button"
            onClick={handleConnectClickUp}
            disabled={isConnectingClickUp}
          >
            <LucideMousePointerClick />
            {isConnectingClickUp ? "Connecting..." : "Connect with ClickUp"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
=======
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple demo authentication
    if (email === "demo@example.com" && password === "password") {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push("/dashboard")
    } else {
      alert("Invalid credentials. Try demo@example.com / password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-cyan-200 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Invoice</h1>
        <p className="text-gray-600">Professional invoicing for freelancers and businesses</p>
      </div>

      {/* Sign In Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-gray-900 font-medium mb-2 block">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="text-gray-900 font-medium mb-2 block">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-gray-50 border-gray-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-gray-900 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {"Don't have an account? "}
          <Link href="/signup" className="text-gray-900 hover:underline font-medium">
            Sign up
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-1">Demo Credentials:</p>
          <p className="text-sm text-gray-600 font-mono">Email: demo@example.com</p>
          <p className="text-sm text-gray-600 font-mono">Password: password</p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-8 max-w-md">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-gray-900 hover:underline font-medium">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-gray-900 hover:underline font-medium">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
>>>>>>> ad8e8b1e72c955b91891a6aac30e07721a3bee79
}
