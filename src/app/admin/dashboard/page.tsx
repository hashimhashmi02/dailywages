"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  Clock,
  ArrowUpRight,
  ChevronRight,
  BarChart3,
  Home,
  Menu,
  X,
} from "lucide-react";
import { MOCK_ADMIN_STATS } from "@/lib/constants";
import UserAvatar from "@/components/UserAvatar";
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "@/components/LogoutButton";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home, active: true },
  { label: "Workers", href: "/admin/workers", icon: Users },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
];

const RECENT_ACTIVITY = [
  { type: "booking", text: "New booking: Plumbing — Rahul S. → Suresh K.", time: "2 min ago" },
  { type: "worker", text: "New worker registration: Vikram T. — Carpenter", time: "15 min ago" },
  { type: "payment", text: "Payment completed: ₹850 via UPI — Booking #DW-2041", time: "28 min ago" },
  { type: "dispute", text: "Dispute raised by Priya P. — Late arrival complaint", time: "1 hr ago" },
  { type: "verification", text: "Worker verified: Anita D. — Cleaner", time: "2 hrs ago" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = MOCK_ADMIN_STATS;

  const KPI_CARDS = [
    { label: "Total Workers", value: stats.totalWorkers.toLocaleString(), change: "+23 this week", icon: Users, color: "#3b82f6", bg: "#eff6ff" },
    { label: "Active Now", value: stats.activeWorkers.toLocaleString(), change: `${stats.completionRate}% completion`, icon: TrendingUp, color: "#22c55e", bg: "#f0fdf4" },
    { label: "Total Customers", value: stats.totalCustomers.toLocaleString(), change: "+156 this month", icon: Users, color: "#8b5cf6", bg: "#f5f3ff" },
    { label: "Revenue", value: `₹${(stats.revenue / 100000).toFixed(1)}L`, change: "+12% vs last month", icon: DollarSign, color: "#f97316", bg: "#fff7ed" },
    { label: "Today's Bookings", value: stats.todayBookings.toString(), change: "Avg rating: " + stats.avgRating, icon: Briefcase, color: "#06b6d4", bg: "#ecfeff" },
    { label: "Open Issues", value: `${stats.pendingVerifications + stats.openDisputes}`, change: `${stats.pendingVerifications} verifications, ${stats.openDisputes} disputes`, icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
  ];

  return (
    <div className="min-h-screen bg-background flex page-transition">
      {/* ─── Sidebar (Desktop) ───────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white min-h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">DailyWages</span>
              <p className="text-[10px] text-slate-400 -mt-0.5">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  item.active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <UserAvatar name="Admin" size="sm" />
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-slate-400">admin@dailywages.in</p>
            </div>
          </div>
          <LogoutButton variant="full" />
        </div>
      </aside>

      {/* ─── Mobile Header ───────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/10">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {sidebarOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 bg-slate-900 z-40 border-t border-slate-800 p-4 animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white text-sm rounded-xl hover:bg-white/5"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* ─── Main Content ────────────────────────────────────────────────── */}
      <main className="flex-1 lg:pt-0 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Overview of DailyWages platform</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card px-4 py-2 rounded-xl border border-border shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              Last updated: Just now
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6 stagger-children">
            {KPI_CARDS.map((kpi) => (
              <div key={kpi.label} className="bg-card rounded-2xl p-5 border border-border hover-lift shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: kpi.bg }}>
                    <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-0.5">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-[10px] text-green-600 mt-1">{kpi.change}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-3 bg-card rounded-2xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-foreground">Weekly Revenue</h2>
                <span className="text-xs text-muted-foreground">This Week</span>
              </div>
              <div className="flex items-end gap-3 h-44">
                {stats.weeklyRevenue.map((d) => {
                  const max = Math.max(...stats.weeklyRevenue.map(w => w.revenue));
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">₹{(d.revenue / 1000).toFixed(0)}k</span>
                      <div
                        className="w-full gradient-primary rounded-xl transition-all group-hover:opacity-80 cursor-pointer"
                        style={{ height: `${(d.revenue / max) * 100}%`, minHeight: "8px" }}
                        title={`₹${d.revenue.toLocaleString()}`}
                      />
                      <span className="text-[10px] text-muted-foreground">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border shadow-sm">
              <h2 className="font-semibold text-foreground mb-4">Top Categories</h2>
              <div className="space-y-3">
                {stats.categoryBreakdown.slice(0, 5).map((cat) => {
                  const maxBookings = Math.max(...stats.categoryBreakdown.map(c => c.bookings));
                  return (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{cat.category}</span>
                        <span className="text-muted-foreground">{cat.bookings} jobs</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full gradient-primary transition-all"
                          style={{ width: `${(cat.bookings / maxBookings) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 bg-card rounded-2xl p-5 border border-border shadow-sm">
            <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((act, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    act.type === "dispute" ? "bg-red-500" :
                    act.type === "payment" ? "bg-green-500" :
                    act.type === "booking" ? "bg-blue-500" :
                    "bg-orange-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{act.text}</p>
                    <p className="text-xs text-muted-foreground">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <Link href="/admin/workers" className="bg-card rounded-2xl p-5 border border-border hover-lift shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">Pending Verifications</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingVerifications}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/admin/disputes" className="bg-card rounded-2xl p-5 border border-border hover-lift shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">Open Disputes</p>
                <p className="text-2xl font-bold text-foreground">{stats.openDisputes}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/admin/revenue" className="bg-card rounded-2xl p-5 border border-border hover-lift shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">This Month</p>
                <p className="text-2xl font-bold text-foreground">₹{(stats.revenue / 100000).toFixed(1)}L</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
