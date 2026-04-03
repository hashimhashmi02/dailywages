"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Shield,
  Check,
  X,
  Eye,
  Star,
  Clock,
  MapPin,
  Search,
  Filter,
} from "lucide-react";

const PENDING_WORKERS = [
  { id: 1, name: "Vikram Thakur", phone: "+91 98765 43216", skill: "Carpenter", aadhaar: "XXXX-XXXX-5678", submittedAt: "2 hours ago", location: "Dwarka, Delhi" },
  { id: 2, name: "Ramesh Babu", phone: "+91 98765 43217", skill: "Mason", aadhaar: "XXXX-XXXX-1234", submittedAt: "5 hours ago", location: "Rohini, Delhi" },
  { id: 3, name: "Geeta Kumari", phone: "+91 98765 43218", skill: "Cleaner", aadhaar: "XXXX-XXXX-9012", submittedAt: "Yesterday", location: "Noida" },
  { id: 4, name: "Pappu Singh", phone: "+91 98765 43219", skill: "Electrician", aadhaar: "XXXX-XXXX-3456", submittedAt: "Yesterday", location: "Ghaziabad" },
  { id: 5, name: "Lakshmi Devi", phone: "+91 98765 43220", skill: "Painter", aadhaar: "XXXX-XXXX-7890", submittedAt: "2 days ago", location: "Gurugram" },
];

const VERIFIED = [
  { id: 6, name: "Suresh Kumar", skill: "Plumber", rating: 4.8, jobs: 342, status: "verified" },
  { id: 7, name: "Mohan Yadav", skill: "Electrician", rating: 4.6, jobs: 218, status: "verified" },
  { id: 8, name: "Ravi Singh", skill: "Painter", rating: 4.9, jobs: 156, status: "verified" },
  { id: 9, name: "Anita Devi", skill: "Cleaner", rating: 4.7, jobs: 487, status: "verified" },
];

export default function AdminWorkersPage() {
  const [tab, setTab] = useState<"pending" | "verified">("pending");
  const [processing, setProcessing] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/admin/dashboard" className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Worker Management</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab("pending")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === "pending" ? "gradient-primary text-white shadow-md" : "bg-muted text-foreground hover:bg-slate-200"
              }`}
            >
              Pending ({PENDING_WORKERS.length})
            </button>
            <button
              onClick={() => setTab("verified")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === "verified" ? "gradient-primary text-white shadow-md" : "bg-muted text-foreground hover:bg-slate-200"
              }`}
            >
              Verified ({VERIFIED.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {tab === "pending" && (
          <div className="space-y-4 animate-fade-in">
            {PENDING_WORKERS.map((w) => (
              <div key={w.id} className={`bg-white rounded-2xl p-5 border border-border transition-all ${processing === w.id ? "opacity-50" : "hover-lift"}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {w.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{w.name}</h3>
                    <p className="text-sm text-primary">{w.skill}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{w.phone}</span>
                      <span>•</span>
                      <span>Aadhaar: {w.aadhaar}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{w.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3" /> {w.submittedAt}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2.5 rounded-xl bg-muted hover:bg-slate-200 transition-colors" title="View Documents">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setProcessing(w.id)}
                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-1"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                      <button
                        onClick={() => setProcessing(w.id)}
                        className="px-4 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "verified" && (
          <div className="space-y-4 animate-fade-in">
            {VERIFIED.map((w) => (
              <div key={w.id} className="bg-white rounded-2xl p-5 border border-border flex items-center gap-4 hover-lift">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold">
                  {w.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{w.name}</h3>
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-primary">{w.skill}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {w.rating}
                  </span>
                  <span className="text-muted-foreground">{w.jobs} jobs</span>
                  <span className="px-3 py-1 rounded-full status-online text-xs font-medium">Active</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
