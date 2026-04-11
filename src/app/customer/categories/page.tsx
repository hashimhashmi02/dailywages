"use client";

import Link from "next/link";
import {
  Wrench,
  Zap,
  Paintbrush,
  Sparkles,
  Hammer,
  Truck,
  Snowflake,
  BrickWall,
  Star,
  ChevronRight,
} from "lucide-react";
import { JOB_CATEGORIES, MOCK_WORKERS } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";
import UserAvatar from "@/components/UserAvatar";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Plumber: Wrench,
  Electrician: Zap,
  Painter: Paintbrush,
  Cleaner: Sparkles,
  Carpenter: Hammer,
  Mover: Truck,
  "AC Repair": Snowflake,
  Mason: BrickWall,
};

const CATEGORY_COLORS: Record<string, string> = {
  Plumber: "#3b82f6",
  Electrician: "#f59e0b",
  Painter: "#8b5cf6",
  Cleaner: "#10b981",
  Carpenter: "#f97316",
  Mover: "#ef4444",
  "AC Repair": "#06b6d4",
  Mason: "#78716c",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-muted page-transition">
      <PageHeader title="All Services" backHref="/customer/dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── Category Cards ────────────────────────────────────────────── */}
        <div className="grid gap-4">
          {JOB_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.name] || Wrench;
            const color = CATEGORY_COLORS[cat.name] || "#6b7280";
            const workers = MOCK_WORKERS.filter((w) => w.categoryId === cat.id);
            const onlineCount = workers.filter((w) => w.isOnline).length;

            return (
              <Link
                key={cat.id}
                href={`/customer/workers?category=${cat.id}`}
                className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg hover:border-primary/20 transition-all hover-lift flex items-center gap-5"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}12` }}
                >
                  <Icon className="w-8 h-8" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
                    <span className="text-sm text-muted-foreground">• {cat.nameHi}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-foreground">From ₹{cat.basePrice}/hr</span>
                    {onlineCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full status-online">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-dot" />
                        {onlineCount} online
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* ─── Popular Near You ──────────────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-foreground mb-4">Top Rated Near You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_WORKERS.filter((w) => w.isVerified).slice(0, 3).map((worker) => (
              <div
                key={worker.id}
                className="bg-card rounded-2xl p-5 border border-border hover-lift"
              >
                <div className="flex items-center gap-3 mb-3">
                  <UserAvatar name={worker.user.name} size="md" isOnline={worker.isOnline} />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{worker.user.name}</h3>
                    <p className="text-xs text-primary">{worker.category.name}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{worker.bio}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{worker.rating}</span>
                    <span className="text-xs text-muted-foreground">({worker.totalJobs} jobs)</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">₹{worker.hourlyRate}/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
