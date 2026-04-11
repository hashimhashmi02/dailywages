"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

const ALL_JOBS = [
  { id: "#DW-2045", customer: "Rahul Sharma", worker: "Suresh Kumar", category: "Plumbing", status: "IN_PROGRESS", amount: 750, time: "10 min ago" },
  { id: "#DW-2044", customer: "Priya Patel", worker: "Mohan Yadav", category: "Electrical", status: "ACCEPTED", amount: 450, time: "25 min ago" },
  { id: "#DW-2043", customer: "Amit Kumar", worker: "-", category: "Painting", status: "PENDING", amount: 600, time: "40 min ago" },
  { id: "#DW-2042", customer: "Sunita Devi", worker: "Anita Devi", category: "Cleaning", status: "COMPLETED", amount: 350, time: "1 hr ago" },
  { id: "#DW-2041", customer: "Vikash Gupta", worker: "Ravi Singh", category: "Painting", status: "COMPLETED", amount: 1200, time: "2 hrs ago" },
  { id: "#DW-2040", customer: "Deepak Nair", worker: "Vikram Thakur", category: "Carpentry", status: "CANCELLED", amount: 550, time: "3 hrs ago" },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Pending", cls: "status-pending" },
  ACCEPTED: { label: "Accepted", cls: "status-active" },
  IN_PROGRESS: { label: "In Progress", cls: "status-active" },
  COMPLETED: { label: "Completed", cls: "status-completed" },
  CANCELLED: { label: "Cancelled", cls: "status-cancelled" },
};

export default function AdminJobsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = ALL_JOBS.filter(j => filter === "all" || j.status === filter);

  return (
    <div className="min-h-screen bg-background page-transition">
      <PageHeader title="Jobs Overview" backHref="/admin/dashboard">
        <div className="flex gap-2 flex-wrap">
          {["all", "PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${filter === f ? "btn-primary" : "bg-muted text-foreground hover:bg-border"}`}>
              {f === "all" ? "All" : STATUS_MAP[f]?.label || f}
            </button>
          ))}
        </div>
      </PageHeader>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Map placeholder */}
        <div className="bg-gradient-to-br from-muted to-border rounded-2xl h-48 mb-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse-dot" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '1s' }} />
          </div>
          <div className="text-center z-10">
            <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-medium">Live Jobs Map</p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No jobs found" description="Try selecting a different filter." />
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Job ID</th>
                    <th className="text-left px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Customer</th>
                    <th className="text-left px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Worker</th>
                    <th className="text-left px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Amount</th>
                    <th className="text-right px-5 py-3.5 text-muted-foreground font-medium text-xs uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((job) => (
                    <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4 font-semibold text-primary">{job.id}</td>
                      <td className="px-5 py-4 text-foreground">{job.customer}</td>
                      <td className="px-5 py-4 text-foreground">{job.worker}</td>
                      <td className="px-5 py-4 text-muted-foreground">{job.category}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_MAP[job.status]?.cls}`}>
                          {STATUS_MAP[job.status]?.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-semibold text-foreground">₹{job.amount}</td>
                      <td className="px-5 py-4 text-right text-muted-foreground text-xs">{job.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
