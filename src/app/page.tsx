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
}
