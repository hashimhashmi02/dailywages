"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  Clock,
  Check,
  Eye,
  MessageSquare,
  X,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import UserAvatar from "@/components/UserAvatar";
import { showToast } from "@/components/Toast";

const INITIAL_DISPUTES = [
  { id: 1, customer: "Priya Patel", worker: "Suresh Kumar", reason: "Worker arrived 45 minutes late", status: "OPEN", booking: "#DW-2038", amount: 750, raisedAt: "2 hours ago" },
  { id: 2, customer: "Amit Kumar", worker: "Mohan Yadav", reason: "Incomplete work — only fixed 1 of 3 switches", status: "UNDER_REVIEW", booking: "#DW-2035", amount: 450, raisedAt: "Yesterday" },
  { id: 3, customer: "Sunita Devi", worker: "Ravi Singh", reason: "Charged more than the quoted price", status: "OPEN", booking: "#DW-2029", amount: 1200, raisedAt: "2 days ago" },
  { id: 4, customer: "Rahul Sharma", worker: "Anita Devi", reason: "Wrong cleaning chemicals used, damaged floor tiles", status: "RESOLVED", booking: "#DW-2021", amount: 350, raisedAt: "1 week ago", resolution: "Full refund issued to customer" },
  { id: 5, customer: "Vikash Gupta", worker: "Vikram Thakur", reason: "Worker cancelled after accepting", status: "CLOSED", booking: "#DW-2015", amount: 550, raisedAt: "2 weeks ago", resolution: "Warning issued to worker" },
];

const STATUS_INFO: Record<string, { label: string; class: string }> = {
  OPEN: { label: "Open", class: "status-pending" },
  UNDER_REVIEW: { label: "Under Review", class: "status-active" },
  RESOLVED: { label: "Resolved", class: "status-completed" },
  CLOSED: { label: "Closed", class: "status-offline" },
};

export default function DisputesPage() {
  const [filter, setFilter] = useState<string>("all");
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const filtered = disputes.filter(d => filter === "all" || d.status === filter);

  const handleResolve = (id: number) => {
    setDisputes(prev => prev.map(d =>
      d.id === id ? { ...d, status: "RESOLVED", resolution: "Resolved by admin" } : d
    ));
    showToast("Dispute resolved successfully", "success");
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <PageHeader title="Dispute Resolution" backHref="/admin/dashboard">
        <div className="flex gap-2 flex-wrap">
          {["all", "OPEN", "UNDER_REVIEW", "RESOLVED", "CLOSED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === f ? "btn-primary" : "bg-muted text-foreground hover:bg-border"
              }`}
            >
              {f === "all" ? "All" : STATUS_INFO[f]?.label || f}
            </button>
          ))}
        </div>
      </PageHeader>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-4 stagger-children">
          {filtered.map((d) => (
            <div key={d.id} className="bg-card rounded-2xl p-5 border border-border hover-lift shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{d.reason}</h3>
                    <p className="text-xs text-muted-foreground">{d.booking} • ₹{d.amount}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_INFO[d.status]?.class}`}>
                  {STATUS_INFO[d.status]?.label}
                </span>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground mb-3 pl-14">
                <span className="flex items-center gap-1.5">
                  <UserAvatar name={d.customer} size="sm" className="!w-5 !h-5 !text-[8px] !rounded-md" />
                  {d.customer}
                </span>
                <span>→</span>
                <span className="flex items-center gap-1.5">
                  <UserAvatar name={d.worker} size="sm" className="!w-5 !h-5 !text-[8px] !rounded-md" />
                  {d.worker}
                </span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {d.raisedAt}</span>
              </div>

              {(d as { resolution?: string }).resolution && (
                <div className="ml-14 px-3 py-2.5 bg-green-50 rounded-xl text-xs text-green-700 mb-3 border border-green-100">
                  <strong>Resolution:</strong> {(d as { resolution?: string }).resolution}
                </div>
              )}

              {(d.status === "OPEN" || d.status === "UNDER_REVIEW") && (
                <div className="flex gap-2 ml-14">
                  <button className="px-4 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-border transition-colors flex items-center gap-1.5" aria-label="View details">
                    <Eye className="w-4 h-4" /> View Details
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-border transition-colors flex items-center gap-1.5" aria-label="Contact parties">
                    <MessageSquare className="w-4 h-4" /> Contact
                  </button>
                  <button
                    onClick={() => handleResolve(d.id)}
                    className="px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1.5 border border-green-100"
                    aria-label="Resolve dispute"
                  >
                    <Check className="w-4 h-4" /> Resolve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
