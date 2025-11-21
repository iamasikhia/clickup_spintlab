"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-cyan-200 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Invoice</h1>
        <p className="text-gray-600">
          Professional invoicing for freelancers and businesses
        </p>
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect your ClickUp Account
          </h2>
          <p className="text-gray-600"></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className="text-gray-900 font-medium mb-2 block"
            >
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
          <div>
            <Label
              htmlFor="password"
              className="text-gray-900 font-medium mb-2 block"
            >
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
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Google Sign Up Button */}
        <Link href="">
          <Button
            variant="outline"
            className="w-full mb-4 mt-4 bg-white border-gray-300 hover:bg-gray-50"
            type="button"
          >
            Connect with ClickUp
          </Button>
        </Link>
      </div>
    </div>
  );
}
