"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  Shield,
  Clock,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  ChevronRight,
  Check,
} from "lucide-react";
import { MOCK_WORKERS, JOB_CATEGORIES, APP_CONFIG } from "@/lib/constants";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<"instant" | "scheduled">("instant");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "WALLET" | "CASH">("UPI");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const worker = MOCK_WORKERS[0]; // For demo
  const estimatedCost = worker.hourlyRate * 2; // 2-hour estimate
  const platformFee = Math.round(estimatedCost * APP_CONFIG.commissionRate);
  const total = estimatedCost + platformFee;

  return (
    <div className="min-h-screen bg-muted">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/customer/workers" className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Book Worker</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                    s <= step
                      ? "gradient-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 rounded-full ${s < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">Details</span>
            <span className="text-[10px] text-muted-foreground">Payment</span>
            <span className="text-[10px] text-muted-foreground">Confirm</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── Worker Info Card ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-5 border border-border mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-lg">
                {worker.user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{worker.user.name}</h3>
                <Shield className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-sm text-primary">{worker.category.name}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  {worker.rating}
                </span>
                <span className="text-xs text-muted-foreground">{worker.totalJobs} jobs</span>
              </div>
            </div>
            <p className="ml-auto text-xl font-bold text-foreground">₹{worker.hourlyRate}<span className="text-xs font-normal text-muted-foreground">/hr</span></p>
          </div>
        </div>

        {/* ─── Step 1: Job Details ───────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Booking Type */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Booking Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBookingType("instant")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    bookingType === "instant" ? "border-primary bg-primary-light" : "border-border bg-white hover:border-primary/30"
                  }`}
                >
                  <Clock className={`w-6 h-6 mb-2 ${bookingType === "instant" ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold text-foreground text-sm">Book Now</p>
                  <p className="text-xs text-muted-foreground">Worker arrives in ~15 min</p>
                </button>
                <button
                  onClick={() => setBookingType("scheduled")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    bookingType === "scheduled" ? "border-primary bg-primary-light" : "border-border bg-white hover:border-primary/30"
                  }`}
                >
                  <Calendar className={`w-6 h-6 mb-2 ${bookingType === "scheduled" ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold text-foreground text-sm">Schedule</p>
                  <p className="text-xs text-muted-foreground">Choose date & time</p>
                </button>
              </div>
            </div>

            {/* Schedule Inputs */}
            {bookingType === "scheduled" && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Service Location</label>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border cursor-pointer hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">A-12, Safdarjung Enclave</p>
                  <p className="text-xs text-muted-foreground">New Delhi, 110029</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Describe the Job</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Kitchen sink is leaking. Need pipe replacement and tap repair..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* ─── Step 2: Payment ───────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Payment Method</label>
              <div className="space-y-3">
                {[
                  { id: "UPI" as const, label: "UPI (PhonePe, GPay, Paytm)", icon: Smartphone, desc: "Instant & secure" },
                  { id: "WALLET" as const, label: "DailyWages Wallet", icon: CreditCard, desc: "Balance: ₹2,500" },
                  { id: "CASH" as const, label: "Cash on Completion", icon: Banknote, desc: "Pay after job is done" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === method.id ? "border-primary bg-primary-light" : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? "bg-primary/10" : "bg-muted"}`}>
                      <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? "border-primary" : "border-border"
                    }`}>
                      {paymentMethod === method.id && <div className="w-3 h-3 rounded-full bg-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Price Estimate</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service charge (est. 2 hrs)</span>
                  <span className="font-medium text-foreground">₹{estimatedCost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform fee (15%)</span>
                  <span className="font-medium text-foreground">₹{platformFee}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total (estimated)</span>
                  <span className="text-xl font-bold text-primary">₹{total}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">* Final amount may vary based on actual hours worked</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-4 border border-border rounded-2xl font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg"
              >
                Review Booking
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 3: Confirm ───────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-5 border border-border space-y-4">
              <h3 className="font-semibold text-foreground">Booking Summary</h3>

              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  {worker.user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{worker.user.name}</p>
                  <p className="text-xs text-primary">{worker.category.name}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-foreground capitalize">{bookingType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium text-foreground">{paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground text-right">Safdarjung Enclave</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Estimated Total</span>
                  <span className="text-lg font-bold text-primary">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-4 border border-border rounded-2xl font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Back
              </button>
              <Link
                href="/customer/track/b1"
                className="flex-1 py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg text-center"
              >
                ✅ Confirm Booking
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
