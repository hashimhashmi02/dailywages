"use client";

import { useState } from "react";
import {
  Shield,
  Check,
  X,
  Eye,
  Star,
  Clock,
  MapPin,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import UserAvatar from "@/components/UserAvatar";
import { showToast } from "@/components/Toast";

const INITIAL_PENDING = [
  { id: 1, name: "Vikram Thakur", phone: "+91 98765 43216", skill: "Carpenter", aadhaar: "XXXX-XXXX-5678", submittedAt: "2 hours ago", location: "Dwarka, Delhi" },
  { id: 2, name: "Ramesh Babu", phone: "+91 98765 43217", skill: "Mason", aadhaar: "XXXX-XXXX-1234", submittedAt: "5 hours ago", location: "Rohini, Delhi" },
  { id: 3, name: "Geeta Kumari", phone: "+91 98765 43218", skill: "Cleaner", aadhaar: "XXXX-XXXX-9012", submittedAt: "Yesterday", location: "Noida" },
  { id: 4, name: "Pappu Singh", phone: "+91 98765 43219", skill: "Electrician", aadhaar: "XXXX-XXXX-3456", submittedAt: "Yesterday", location: "Ghaziabad" },
  { id: 5, name: "Lakshmi Devi", phone: "+91 98765 43220", skill: "Painter", aadhaar: "XXXX-XXXX-7890", submittedAt: "2 days ago", location: "Gurugram" },
];

const INITIAL_VERIFIED = [
  { id: 6, name: "Suresh Kumar", skill: "Plumber", rating: 4.8, jobs: 342 },
  { id: 7, name: "Mohan Yadav", skill: "Electrician", rating: 4.6, jobs: 218 },
  { id: 8, name: "Ravi Singh", skill: "Painter", rating: 4.9, jobs: 156 },
  { id: 9, name: "Anita Devi", skill: "Cleaner", rating: 4.7, jobs: 487 },
];

export default function AdminWorkersPage() {
  const [tab, setTab] = useState<"pending" | "verified">("pending");
  const [pending, setPending] = useState(INITIAL_PENDING);
  const [verified, setVerified] = useState(INITIAL_VERIFIED);
  const [processing, setProcessing] = useState<number | null>(null);

  const handleApprove = (worker: (typeof INITIAL_PENDING)[0]) => {
    setProcessing(worker.id);
    // Simulate async processing
    setTimeout(() => {
      setPending((prev) => prev.filter((w) => w.id !== worker.id));
      setVerified((prev) => [
        ...prev,
        { id: worker.id, name: worker.name, skill: worker.skill, rating: 0, jobs: 0 },
      ]);
      setProcessing(null);
      showToast(`${worker.name} has been approved!`, "success");
    }, 600);
  };

  const handleReject = (worker: (typeof INITIAL_PENDING)[0]) => {
    setProcessing(worker.id);
    setTimeout(() => {
      setPending((prev) => prev.filter((w) => w.id !== worker.id));
      setProcessing(null);
      showToast(`${worker.name} has been rejected.`, "error");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <PageHeader title="Worker Management" backHref="/admin/dashboard">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("pending")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "pending" ? "gradient-primary text-white shadow-md" : "bg-muted text-foreground hover:bg-slate-200"
            }`}
          >
            Pending ({pending.length})
          </button>
          <button
            onClick={() => setTab("verified")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "verified" ? "gradient-primary text-white shadow-md" : "bg-muted text-foreground hover:bg-slate-200"
            }`}
          >
            Verified ({verified.length})
          </button>
        </div>
      </PageHeader>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {tab === "pending" && (
          <div className="space-y-4 animate-fade-in">
            {pending.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center mb-5">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                <p className="text-sm text-muted-foreground">No pending worker verifications.</p>
              </div>
            ) : (
              pending.map((w) => (
                <div
                  key={w.id}
                  className={`bg-card rounded-2xl p-5 border border-border transition-all ${
                    processing === w.id ? "opacity-50 scale-[0.98]" : "hover-lift"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <UserAvatar name={w.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{w.name}</h3>
                      <p className="text-sm text-primary">{w.skill}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{w.phone}</span>
                        <span>•</span>
                        <span>Aadhaar: {w.aadhaar}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{w.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" /> {w.submittedAt}
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-muted hover:bg-slate-200 transition-colors"
                          title="View Documents"
                          aria-label={`View documents for ${w.name}`}
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleReject(w)}
                          disabled={processing === w.id}
                          className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                        <button
                          onClick={() => handleApprove(w)}
                          disabled={processing === w.id}
                          className="px-4 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "verified" && (
          <div className="space-y-4 animate-fade-in">
            {verified.map((w) => (
              <div key={w.id} className="bg-card rounded-2xl p-5 border border-border flex items-center gap-4 hover-lift">
                <UserAvatar name={w.name} size="md" />
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
