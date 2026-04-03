"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  Check,
  X,
  Filter,
} from "lucide-react";
import { useState } from "react";

const JOBS = [
  { id: 1, customer: "Rahul Sharma", task: "Kitchen Sink Repair", address: "Safdarjung Enclave", amount: 750, status: "completed", rating: 5, time: "Today, 10:35 AM", duration: "1.5 hrs" },
  { id: 2, customer: "Priya Patel", task: "Bathroom Pipe Leak", address: "Hauz Khas", amount: 850, status: "completed", rating: 4, time: "Yesterday, 2:00 PM", duration: "2 hrs" },
  { id: 3, customer: "Amit Kumar", task: "Faucet Replacement", address: "Green Park", amount: 600, status: "completed", rating: 5, time: "Apr 1, 11:30 AM", duration: "1 hr" },
  { id: 4, customer: "Sunita Devi", task: "Water Heater Installation", address: "Lajpat Nagar", amount: 1200, status: "completed", rating: 5, time: "Mar 31, 9:00 AM", duration: "3 hrs" },
  { id: 5, customer: "Vikash Gupta", task: "Toilet Repair", address: "Saket", amount: 500, status: "cancelled", rating: 0, time: "Mar 30, 4:00 PM", duration: "-" },
];

export default function WorkerJobsPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">("all");
  const filtered = JOBS.filter(j => filter === "all" || j.status === filter);

  return (
    <div className="min-h-screen bg-muted pb-20">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/worker/dashboard" className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">My Jobs</h1>
          </div>
          <div className="flex gap-2">
            {(["all", "completed", "cancelled"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                  filter === f ? "gradient-primary text-white" : "bg-muted text-foreground hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-3">
          {filtered.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-4 border border-border hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{job.task}</h3>
                  <p className="text-xs text-muted-foreground">{job.customer}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  job.status === "completed" ? "status-completed" : "status-cancelled"
                }`}>
                  {job.status === "completed" ? <Check className="w-3 h-3 inline mr-1" /> : <X className="w-3 h-3 inline mr-1" />}
                  {job.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.address}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{job.time}</p>
                <div className="flex items-center gap-3">
                  {job.rating > 0 && (
                    <span className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {job.rating}
                    </span>
                  )}
                  <span className="font-bold text-foreground">₹{job.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
