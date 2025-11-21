"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { url } from "inspector";

export default function SignUpPage() {
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

        {/* Google Sign Up Button */}
        <Link href={url}>
          <Button
            variant="outline"
            className="w-full mb-4 bg-white border-gray-300 hover:bg-gray-50"
            type="button"
          >
            Connect with ClickUp
          </Button>
        </Link>
      </div>
    </div>
  );
}
