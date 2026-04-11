"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import {
  Wrench,
  Zap,
  Paintbrush,
  Sparkles,
  Hammer,
  Truck,
  Snowflake,
  BrickWall,
  MapPin,
  Search,
  Bell,
  Star,
  Clock,
  ArrowRight,
  ChevronRight,
  Plus,
  Home,
} from "lucide-react";
import { MOCK_BOOKINGS, MOCK_WORKERS, JOB_CATEGORIES } from "@/lib/constants";
import UserAvatar from "@/components/UserAvatar";
import ThemeToggle from "@/components/ThemeToggle";

const QUICK_CATEGORIES = [
  { name: "Plumber", icon: Wrench, color: "#3b82f6" },
  { name: "Electrician", icon: Zap, color: "#f59e0b" },
  { name: "Painter", icon: Paintbrush, color: "#8b5cf6" },
  { name: "Cleaner", icon: Sparkles, color: "#10b981" },
  { name: "Carpenter", icon: Hammer, color: "#f97316" },
  { name: "Mover", icon: Truck, color: "#ef4444" },
  { name: "AC Repair", icon: Snowflake, color: "#06b6d4" },
  { name: "Mason", icon: BrickWall, color: "#78716c" },
];

const NEARBY_WORKERS = MOCK_WORKERS.filter((w) => w.isOnline).slice(0, 3);

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-muted page-transition">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Good evening 👋</p>
              <h1 className="text-xl font-bold text-foreground">Rahul Sharma</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button className="relative p-2.5 rounded-xl bg-muted hover:bg-slate-200 transition-colors" aria-label="Notifications">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <UserAvatar name="Rahul Sharma" size="sm" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for plumber, electrician, cleaner..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* ─── Location Bar ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-2xl border border-border mb-6 hover-lift cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">A-12, Safdarjung Enclave</p>
            <p className="text-xs text-muted-foreground">New Delhi, 110029</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* ─── Active Booking Banner ─────────────────────────────────────── */}
        {MOCK_BOOKINGS.length > 0 && (
          <Link
            href="/customer/track/b1"
            className="block mb-6 p-4 gradient-accent rounded-2xl text-white hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-100">Active Booking</p>
                <p className="text-lg font-bold">{MOCK_BOOKINGS[0].worker.user.name} — Plumbing</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse-dot" />
                  <span className="text-sm text-teal-100">Worker is on the way</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs">Track</span>
              </div>
            </div>
          </Link>
        )}

        {/* ─── Quick Categories ──────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Services</h2>
            <Link href="/customer/categories" className="text-sm font-medium text-primary flex items-center gap-1">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href="/customer/categories"
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}12` }}
                >
                  <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <span className="text-xs font-medium text-foreground text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Nearby Workers ────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Nearby Workers</h2>
            <Link href="/customer/workers" className="text-sm font-medium text-primary flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEARBY_WORKERS.map((worker) => (
              <Link
                key={worker.id}
                href={`/customer/workers`}
                className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg hover:border-primary/20 transition-all hover-lift"
              >
                <div className="flex items-start gap-4">
                  <UserAvatar name={worker.user.name} size="lg" isOnline={true} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{worker.user.name}</h3>
                    <p className="text-sm text-primary font-medium">{worker.category.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {worker.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{worker.totalJobs} jobs</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-medium text-foreground">₹{worker.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Recent Activity ───────────────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Plumbing — Kitchen Sink Repair</p>
                <p className="text-xs text-muted-foreground">Suresh Kumar • Completed yesterday</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">5.0</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Electrical — Fan Installation</p>
                <p className="text-xs text-muted-foreground">Mohan Yadav • 3 days ago</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.5</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Bottom Nav (Mobile) ─────────────────────────────────────────── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50" aria-label="Customer navigation">
        <div className="flex items-center justify-around py-2">
          <Link href="/customer/dashboard" className="flex flex-col items-center gap-0.5 py-1 text-primary" aria-current="page">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/customer/categories" className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium">Search</span>
          </Link>
          <Link href="/customer/categories" className="flex flex-col items-center gap-0.5 py-1 relative -top-4" aria-label="Book a new service">
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Plus className="w-7 h-7 text-white" />
            </div>
          </Link>
          <Link href="/customer/dashboard" className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-medium">History</span>
          </Link>
          <Link href="/customer/dashboard" className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground" aria-label="Profile">
            <UserAvatar name="Rahul Sharma" size="sm" className="!w-7 !h-7 !text-[10px] !rounded-full" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
