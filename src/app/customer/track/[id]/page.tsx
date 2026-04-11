"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Shield,
  Clock,
  Navigation,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { MOCK_WORKERS } from "@/lib/constants";
import UserAvatar from "@/components/UserAvatar";

const TRACKING_STEPS = [
  { id: 1, label: "Booking Confirmed", time: "10:35 AM", done: true },
  { id: 2, label: "Worker Accepted", time: "10:36 AM", done: true },
  { id: 3, label: "On the Way", time: "10:38 AM", done: true },
  { id: 4, label: "Arrived at Location", time: "", done: false },
  { id: 5, label: "Work in Progress", time: "", done: false },
  { id: 6, label: "Job Completed", time: "", done: false },
];

export default function TrackPage() {
  const worker = MOCK_WORKERS[0];
  const [eta, setEta] = useState(12);

  // Simulate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col page-transition">
      <header className="header-blur sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/customer/dashboard" className="p-2 rounded-xl hover:bg-muted transition-colors">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">Live Tracking</h1>
                <p className="text-xs text-muted-foreground">Booking #DW-20260403-001</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              On the Way
            </span>
          </div>
        </div>
      </header>

      {/* ─── Map Area ────────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 h-64 sm:h-80 overflow-hidden">
        {/* Simulated Map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Route line */}
            <div className="absolute top-1/2 left-0 w-48 h-0.5 bg-primary/30 rounded-full" style={{ transform: 'rotate(-20deg)', transformOrigin: 'left center' }} />
            
            {/* Worker marker */}
            <div className="absolute -top-4 -left-4 animate-float">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-white">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                {worker.user.name.split(" ")[0]}
              </div>
            </div>

            {/* Customer marker */}
            <div className="absolute top-8 left-44">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                Your location
              </div>
            </div>
          </div>
        </div>

        {/* ETA Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass-card px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Estimated Arrival</p>
                <p className="text-xs text-muted-foreground">1.8 km away</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{eta}</p>
              <p className="text-xs text-muted-foreground">minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Worker Card ─────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 -mt-2 relative z-10">
        <div className="bg-card rounded-2xl p-5 border border-border shadow-lg">
          <div className="flex items-center gap-4 mb-4">
              <UserAvatar name={worker.user.name} size="lg" isOnline={true} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{worker.user.name}</h3>
                <Shield className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-sm text-primary">{worker.category.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{worker.rating} • {worker.totalJobs} jobs</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors" aria-label="Call worker">
                <Phone className="w-5 h-5 text-green-600" />
              </button>
              <button className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors" aria-label="Message worker">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>

          {/* OTP */}
          <div className="bg-muted rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Verification OTP</p>
              <p className="text-sm font-medium text-foreground">Share this with worker on arrival</p>
            </div>
            <div className="flex gap-1.5">
              {["4", "7", "2", "9"].map((d, i) => (
                <div key={i} className="w-9 h-10 rounded-lg bg-card border border-border flex items-center justify-center font-bold text-foreground">
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tracking Timeline ───────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        <h3 className="font-semibold text-foreground mb-4">Tracking Updates</h3>
        <div className="space-y-0">
          {TRACKING_STEPS.map((trackStep, i) => (
            <div key={trackStep.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {trackStep.done ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-border shrink-0" />
                )}
                {i < TRACKING_STEPS.length - 1 && (
                  <div className={`w-0.5 h-10 ${trackStep.done ? "bg-green-300" : "bg-border"}`} />
                )}
              </div>
              <div className="pb-6">
                <p className={`text-sm font-medium ${trackStep.done ? "text-foreground" : "text-muted-foreground"}`}>
                  {trackStep.label}
                </p>
                {trackStep.time && (
                  <p className="text-xs text-muted-foreground">{trackStep.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
