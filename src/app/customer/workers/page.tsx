"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Filter,
  SortAsc,
  Shield,
  Clock,
  Phone,
  MessageSquare,
  ChevronDown,
  X,
} from "lucide-react";
import { MOCK_WORKERS, JOB_CATEGORIES } from "@/lib/constants";

export default function WorkersPage() {
  const [sortBy, setSortBy] = useState<"rating" | "price" | "distance">("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredWorkers = MOCK_WORKERS
    .filter((w) => !selectedCategory || w.categoryId === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.hourlyRate - b.hourlyRate;
      return 0;
    });

  return (
    <div className="min-h-screen bg-muted">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/customer/categories" className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Available Workers</h1>
          </div>

          {/* Sort & Filter Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
              {selectedCategory && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
              )}
            </button>
            <div className="flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="price">Lowest Price</option>
                <option value="distance">Nearest</option>
              </select>
            </div>
            <span className="text-sm text-muted-foreground ml-auto">{filteredWorkers.length} workers</span>
          </div>
        </div>
      </header>

      {/* ─── Filter Drawer ─────────────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-white border-b border-border px-4 sm:px-6 py-4 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Filter by Category</h3>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-primary font-medium flex items-center gap-1"
                >
                  Clear <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {JOB_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "gradient-primary text-white"
                      : "bg-muted text-foreground hover:bg-slate-200"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Worker List ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Map placeholder */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-48 sm:h-64 mb-6 flex items-center justify-center border border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse-dot" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '1s' }} />
          </div>
          <div className="text-center z-10">
            <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-medium">Map View</p>
            <p className="text-xs text-muted-foreground">Workers near Safdarjung Enclave, New Delhi</p>
          </div>
        </div>

        {/* Worker Cards */}
        <div className="grid gap-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-border hover:shadow-lg transition-all hover-lift"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-xl">
                    {worker.user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  {worker.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-white rounded-full" />
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{worker.user.name}</h3>
                        {worker.isVerified && (
                          <Shield className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-primary font-medium">{worker.category.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">₹{worker.hourlyRate}</p>
                      <p className="text-xs text-muted-foreground">per hour</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{worker.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {worker.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{worker.rating}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">{worker.totalJobs} jobs done</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~15 min away
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/customer/booking/${worker.id}`}
                      className="flex-1 px-6 py-3 gradient-primary text-white text-sm font-semibold rounded-xl text-center hover:opacity-90 transition-opacity shadow-md"
                    >
                      Book Now
                    </Link>
                    <button className="p-3 rounded-xl border border-border hover:bg-muted transition-colors">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-3 rounded-xl border border-border hover:bg-muted transition-colors">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
