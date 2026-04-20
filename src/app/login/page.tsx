"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { login } from "@/lib/auth";
import {
  Wrench,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  Zap,
  Paintbrush,
  Hammer,
} from "lucide-react";

/* ─── Static Data ──────────────────────────────────────────────────────────── */

const ROLES = [
  { key: "CUSTOMER" as const, label: "Customer", icon: Users, sub: "Book services" },
  { key: "WORKER" as const, label: "Worker", icon: Wrench, sub: "Find work" },
  { key: "ADMIN" as const, label: "Admin", icon: ShieldCheck, sub: "Manage" },
];

const STATS = [
  { value: "2,500+", label: "Verified Workers" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "25,000+", label: "Jobs Completed" },
];

const AVATARS = [
  { initials: "RS", bg: "#f97316" },
  { initials: "AP", bg: "#0d9488" },
  { initials: "VK", bg: "#8b5cf6" },
  { initials: "SD", bg: "#3b82f6" },
];

/* ─── Component ────────────────────────────────────────────────────────────── */

export default function LoginPage() {
  const [role, setRole] = useState<"CUSTOMER" | "WORKER" | "ADMIN">("CUSTOMER");
  const [showPw, setShowPw] = useState(false);
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT: Hero Panel ────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col justify-between p-14 xl:p-16 relative overflow-hidden bg-[#0f172a]">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-[#1e1b4b] to-[#0f172a]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        {/* Floating decorations */}
        <Wrench className="absolute top-[14%] left-[10%] w-5 h-5 text-white/[0.06]" style={{ animation: "float 5s ease-in-out infinite" }} />
        <Zap className="absolute top-[28%] right-[14%] w-4 h-4 text-white/[0.06]" style={{ animation: "float 6s ease-in-out 1s infinite" }} />
        <Paintbrush className="absolute bottom-[30%] left-[8%] w-4 h-4 text-white/[0.06]" style={{ animation: "float 5s ease-in-out 2s infinite" }} />
        <Hammer className="absolute bottom-[16%] right-[10%] w-5 h-5 text-white/[0.06]" style={{ animation: "float 4s ease-in-out 0.5s infinite" }} />

        {/* Content (z-10) */}
        <div className="relative z-10 flex flex-col justify-between h-full gap-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">DailyWages</span>
          </div>

          {/* Hero copy */}
          <div className="space-y-6 max-w-sm">
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Skilled workers,
              <br />
              <span className="text-gradient">one tap away.</span>
            </h1>
            <p className="text-slate-400 leading-relaxed">
              Book verified plumbers, electricians, carpenters & more — instantly at your doorstep.
            </p>
            <div className="flex gap-8 pt-2">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((a, i) => (
                <div
                  key={a.initials}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900"
                  style={{ backgroundColor: a.bg, zIndex: AVATARS.length - i }}
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Rated 4.8 by 10,000+ users</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: Auth Form ────────────────────────────────────────────── */}
      <main className="flex flex-col bg-white">
        {/* Mobile-only header */}
        <header className="lg:hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] px-6 pt-10 pb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/30">
            <Wrench className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">DailyWages</h1>
          <p className="text-indigo-300/70 text-sm mt-1">Skilled Workers, One Tap Away</p>
        </header>

        {/* Centered form wrapper */}
        <div className="flex-1 flex items-start lg:items-center justify-center overflow-y-auto">
          <div className="w-full max-w-md px-6 py-10 lg:py-16">
            {/* Desktop heading */}
            <div className="hidden lg:block mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
              <p className="text-slate-500 mt-2">Sign in to continue to your account</p>
            </div>

            {/* ── Role selector ───────────────────────────────────────── */}
            <fieldset className="mb-8">
              <legend className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Sign in as
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map((r) => {
                  const active = role === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRole(r.key)}
                      className={`relative flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl border-2 transition-all duration-150 ${
                        active
                          ? "border-orange-400 bg-orange-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          active ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <r.icon className="w-5 h-5" />
                      </div>
                      <div className="text-center space-y-0.5">
                        <p className={`text-sm font-semibold ${active ? "text-slate-900" : "text-slate-600"}`}>
                          {r.label}
                        </p>
                        <p className={`text-[10px] ${active ? "text-orange-600" : "text-slate-400"}`}>
                          {r.sub}
                        </p>
                      </div>
                      {active && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 ring-2 ring-white flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* ── Error banner ────────────────────────────────────────── */}
            {state?.message && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                {state.message}
              </div>
            )}

            {/* ── Login form ─────────────────────────────────────────── */}
            <form action={formAction} className="space-y-5">
              <input type="hidden" name="role" value={role} />

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email" name="email" type="email" required autoComplete="email"
                    placeholder="you@example.com"
                    className="block w-full h-12 pl-10 pr-4 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                </div>
                {state?.errors?.email && <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <button type="button" className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="password" name="password" required autoComplete="current-password"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    className="block w-full h-12 pl-10 pr-10 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                  <button
                    type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPw ? "Hide" : "Show"}
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {state?.errors?.password && <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={isPending}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-50 transition-all"
              >
                {isPending ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* ── Divider + Sign up ──────────────────────────────────── */}
            {role !== "ADMIN" && (
              <div className="mt-8 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                  <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">New to DailyWages?</span></div>
                </div>
                <Link
                  href={`/signup?role=${role.toLowerCase()}`}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all"
                >
                  Create a free account <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* ── Trust badges ───────────────────────────────────────── */}
            <div className="mt-8 flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />256-bit SSL</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-500" />Secure login</span>
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-400">
              By signing in you agree to our{" "}
              <span className="text-slate-500 hover:text-orange-600 cursor-pointer">Terms</span> &{" "}
              <span className="text-slate-500 hover:text-orange-600 cursor-pointer">Privacy</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
