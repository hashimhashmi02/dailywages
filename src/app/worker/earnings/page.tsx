"use client";

import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Clock,
} from "lucide-react";

const WEEKLY_DATA = [
  { day: "Mon", amount: 1800, jobs: 3 },
  { day: "Tue", amount: 2200, jobs: 4 },
  { day: "Wed", amount: 1500, jobs: 2 },
  { day: "Thu", amount: 2800, jobs: 5 },
  { day: "Fri", amount: 3100, jobs: 5 },
  { day: "Sat", amount: 2600, jobs: 4 },
  { day: "Sun", amount: 800, jobs: 1 },
];

const maxAmount = Math.max(...WEEKLY_DATA.map(d => d.amount));
const weekTotal = WEEKLY_DATA.reduce((sum, d) => sum + d.amount, 0);
const weekJobs = WEEKLY_DATA.reduce((sum, d) => sum + d.jobs, 0);

const TRANSACTIONS = [
  { id: 1, type: "credit", label: "Plumbing — Priya Patel", amount: 850, date: "Today, 3:45 PM", method: "UPI" },
  { id: 2, type: "credit", label: "Pipe Fix — Amit Kumar", amount: 600, date: "Yesterday, 5:20 PM", method: "Cash" },
  { id: 3, type: "debit", label: "Platform Commission", amount: -217, date: "Yesterday, 5:20 PM", method: "Auto" },
  { id: 4, type: "credit", label: "Heater Install — Sunita D.", amount: 1200, date: "Apr 1, 11:00 AM", method: "UPI" },
  { id: 5, type: "debit", label: "Payout to Bank", amount: -8500, date: "Mar 31, 6:00 PM", method: "NEFT" },
];

export default function EarningsPage() {
  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/worker/dashboard" className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Earnings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── Balance Card ──────────────────────────────────────────────── */}
        <div className="gradient-primary rounded-2xl p-6 text-white mb-6 shadow-lg shadow-orange-500/20">
          <p className="text-sm text-orange-100 mb-1">Available Balance</p>
          <p className="text-4xl font-bold mb-4">₹6,833</p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
              <Wallet className="w-4 h-4" />
              Withdraw
            </button>
            <button className="flex-1 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
              <CreditCard className="w-4 h-4" />
              Bank Details
            </button>
          </div>
        </div>

        {/* ─── Weekly Summary ────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-5 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">This Week</h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Mar 31 - Apr 6
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">₹{weekTotal.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{weekJobs}</p>
              <p className="text-xs text-muted-foreground">Jobs Done</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600 flex items-center justify-center gap-0.5">
                <TrendingUp className="w-4 h-4" /> 12%
              </p>
              <p className="text-xs text-muted-foreground">vs Last Week</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-2 h-32">
            {WEEKLY_DATA.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-muted-foreground">₹{(d.amount / 1000).toFixed(1)}k</span>
                <div
                  className="w-full gradient-primary rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(d.amount / maxAmount) * 100}%`, minHeight: "8px" }}
                />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Transactions ──────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Transaction History</h2>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>

          <div className="space-y-3">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="bg-white rounded-2xl p-4 border border-border flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  tx.amount > 0 ? "bg-green-50" : "bg-red-50"
                }`}>
                  {tx.amount > 0 ? (
                    <ArrowDownRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">{tx.date} • {tx.method}</p>
                </div>
                <p className={`text-sm font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
