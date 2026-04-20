"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signup } from "@/lib/auth";
import {
  Wrench,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Sparkles,
} from "lucide-react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "worker" ? "WORKER" : "CUSTOMER";
  const [role, setRole] = useState<"CUSTOMER" | "WORKER">(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #0d9488 0%, transparent 70%)",
            animation: "float 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full opacity-8"
          style={{
            background:
              "radial-gradient(circle, #f97316 0%, transparent 70%)",
            animation: "float 9s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-18 h-18 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25 hover-lift"
            style={{ width: "72px", height: "72px" }}
          >
            <Wrench className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Join DailyWages
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Create your account to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/20 relative overflow-hidden">
          {/* Subtle top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 gradient-accent"
            style={{ borderRadius: "24px 24px 0 0" }}
          />

          {/* Role Tabs */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-6">
            {(
              [
                { key: "CUSTOMER", label: "Customer" },
                { key: "WORKER", label: "Worker" },
              ] as const
            ).map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  role === r.key
                    ? "bg-white text-slate-900 shadow-sm shadow-black/5"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Sign up as {role === "CUSTOMER" ? "Customer" : "Worker"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {role === "CUSTOMER"
                ? "Find skilled workers near you instantly"
                : "Start earning by showcasing your skills"}
            </p>
          </div>

          {/* Global error */}
          {state?.message && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm animate-slide-down">
              {state.message}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="role" value={role} />

            {/* Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="text-sm font-medium text-slate-700 mb-1.5 block"
              >
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                  autoComplete="name"
                  required
                />
              </div>
              {state?.errors?.name && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="text-sm font-medium text-slate-700 mb-1.5 block"
              >
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                  autoComplete="email"
                  required
                />
              </div>
              {state?.errors?.email && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="signup-phone"
                className="text-sm font-medium text-slate-700 mb-1.5 block"
              >
                Phone{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                  autoComplete="tel"
                />
              </div>
              {state?.errors?.phone && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-slate-700 mb-1.5 block"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                  autoComplete="new-password"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {state?.errors?.password && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 gradient-primary text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">
                Already registered?
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full py-3 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          By creating an account, you agree to our{" "}
          <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
