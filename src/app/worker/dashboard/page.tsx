"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  Bell,
  Power,
  Home,
  Phone,
  MessageSquare,
  Check,
  X,
  Briefcase,
  Wallet,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { MOCK_WORKERS } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";
import UserAvatar from "@/components/UserAvatar";
import StarRating from "@/components/StarRating";
import ThemeToggle from "@/components/ThemeToggle";
import { showToast } from "@/components/Toast";

const WORKER_STATS = [
  { label: "Today's Earnings", value: "₹2,450", icon: DollarSign, color: "#22c55e", bg: "#f0fdf4" },
  { label: "Jobs Today", value: "4", icon: Briefcase, color: "#3b82f6", bg: "#eff6ff" },
  { label: "Rating", value: "4.8", icon: Star, color: "#f59e0b", bg: "#fffbeb" },
  { label: "This Week", value: "₹14,200", icon: TrendingUp, color: "#8b5cf6", bg: "#f5f3ff" },
];

const RECENT_JOBS = [
  { name: "Priya Patel", task: "Bathroom pipe leak fix", amount: 850, rating: 5, time: "Yesterday" },
  { name: "Amit Kumar", task: "Kitchen faucet replacement", amount: 600, rating: 4, time: "2 days ago" },
  { name: "Sunita Devi", task: "Water heater connection", amount: 1200, rating: 5, time: "3 days ago" },
];

export default function WorkerDashboard() {
  const { isWorkerOnline, toggleWorkerOnline } = useAppStore();
  const [showJobRequest, setShowJobRequest] = useState(true);
  const [countdown, setCountdown] = useState(45);
  const worker = MOCK_WORKERS[0];

  // Live countdown timer for job request
  useEffect(() => {
    if (!isWorkerOnline || !showJobRequest) return;
    if (countdown <= 0) {
      setShowJobRequest(false);
      showToast("Job request expired", "warning");
      return;
    }
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [isWorkerOnline, showJobRequest, countdown]);

  const handleAcceptJob = useCallback(() => {
    setShowJobRequest(false);
    showToast("Job accepted! Navigate to the customer.", "success");
  }, []);

  const handleDeclineJob = useCallback(() => {
    setShowJobRequest(false);
    showToast("Job declined. Waiting for next request.", "info");
  }, []);

  const handleToggleOnline = useCallback(() => {
    toggleWorkerOnline();
    if (!isWorkerOnline) {
      showToast("You're now online! Receiving job requests.", "success");
      setShowJobRequest(true);
      setCountdown(45);
    } else {
      showToast("You're now offline.", "info");
    }
  }, [isWorkerOnline, toggleWorkerOnline]);

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header
        className={`header-blur sticky top-0 z-40 transition-colors ${
          isWorkerOnline ? "!bg-green-50/90" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar name={worker.user.name} size="md" isOnline={isWorkerOnline} />
              <div>
                <h1 className="text-lg font-bold text-foreground">{worker.user.name}</h1>
                <p className="text-xs text-muted-foreground">
                  {worker.category.name} • {worker.totalJobs} jobs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className="relative p-2.5 rounded-xl bg-card hover:bg-muted transition-colors border border-border"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>

          {/* Online Toggle */}
          <div className="mt-4 flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
            <div className="flex items-center gap-3">
              <Power className={`w-5 h-5 ${isWorkerOnline ? "text-green-600" : "text-muted-foreground"}`} />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {isWorkerOnline ? "You're Online" : "You're Offline"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isWorkerOnline ? "Receiving job requests nearby" : "Toggle on to start receiving jobs"}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleOnline}
              role="switch"
              aria-checked={isWorkerOnline}
              aria-label="Toggle online status"
              className={`relative w-14 h-8 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-primary ${
                isWorkerOnline ? "bg-green-500" : "bg-slate-300"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  isWorkerOnline ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── Stats Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-6 stagger-children">
          {WORKER_STATS.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border hover-lift shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Incoming Job Request ──────────────────────────────────────── */}
        {isWorkerOnline && showJobRequest && countdown > 0 && (
          <div className="mb-6 animate-slide-up">
            <div className="bg-card rounded-2xl border-2 border-primary shadow-lg overflow-hidden">
              <div className="gradient-primary px-5 py-3 flex items-center justify-between">
                <p className="text-white font-semibold text-sm">🔔 New Job Request!</p>
                <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-bold">
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              {/* Countdown progress bar */}
              <div className="h-1 bg-orange-200">
                <div
                  className="h-full bg-orange-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 45) * 100}%` }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <UserAvatar name="Rahul Sharma" size="md" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Rahul Sharma</h3>
                    <p className="text-sm text-muted-foreground">Kitchen sink leaking badly. Need urgent repair.</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 font-medium">
                        🔴 Urgent
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> 1.8 km away
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">₹750</p>
                    <p className="text-xs text-muted-foreground">est. 2 hrs</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 px-3 py-2.5 bg-muted rounded-xl">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs text-foreground">A-12, Safdarjung Enclave, New Delhi, 110029</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDeclineJob}
                    className="flex-1 py-3.5 border-2 border-border rounded-2xl font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Decline
                  </button>
                  <button
                    onClick={handleAcceptJob}
                    className="flex-[2] py-3.5 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Accept Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Quick Actions ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link href="/worker/earnings" className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border border-border hover-lift">
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-foreground">Earnings</span>
          </Link>
          <Link href="/worker/jobs" className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border border-border hover-lift">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-foreground">My Jobs</span>
          </Link>
          <Link href="/customer/workers" className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border border-border hover-lift">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-foreground">Navigate</span>
          </Link>
        </div>

        {/* ─── Recent Jobs ───────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Recent Jobs</h2>
            <Link href="/worker/jobs" className="text-sm font-medium text-primary flex items-center gap-1">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_JOBS.map((job, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4 hover-lift">
                <UserAvatar name={job.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{job.task}</p>
                  <p className="text-xs text-muted-foreground">{job.name} • {job.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">₹{job.amount}</p>
                  <StarRating rating={job.rating} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ─── Bottom Nav ──────────────────────────────────────────────────── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bottom-nav z-50" aria-label="Worker navigation">
        <div className="flex items-center justify-around py-2">
          <Link href="/worker/dashboard" className="flex flex-col items-center gap-0.5 py-1 text-primary" aria-current="page">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/worker/jobs" className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground">
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-medium">Jobs</span>
          </Link>
          <Link href="/worker/earnings" className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground">
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] font-medium">Earnings</span>
          </Link>
          <Link href="/worker/dashboard" className="flex flex-col items-center gap-0.5 py-1 text-muted-foreground" aria-label="Profile">
            <UserAvatar name={worker.user.name} size="sm" className="!w-7 !h-7 !text-xs !rounded-full" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
