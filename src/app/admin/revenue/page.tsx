"use client";

import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { MOCK_ADMIN_STATS } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";

export default function RevenuePage() {
  const stats = MOCK_ADMIN_STATS;
  const totalRev = stats.categoryBreakdown.reduce((s, c) => s + c.revenue, 0);

  return (
    <div className="min-h-screen bg-background page-transition">
      <PageHeader title="Revenue & Analytics" backHref="/admin/dashboard">
        <div className="flex justify-end -mt-2">
          <button className="px-4 py-2.5 rounded-xl bg-card text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2 border border-border shadow-sm" aria-label="Export revenue data">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </PageHeader>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
          {[
            { label: "Total Revenue", value: `₹${(totalRev / 100000).toFixed(1)}L`, icon: DollarSign, color: "#22c55e", bg: "rgba(34,197,94,0.1)", change: "+12%" },
            { label: "Platform Commission", value: `₹${((totalRev * 0.15) / 100000).toFixed(1)}L`, icon: TrendingUp, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", change: "+8%" },
            { label: "Total Bookings", value: stats.totalBookings.toLocaleString(), icon: Briefcase, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", change: "+156" },
            { label: "Avg Order Value", value: `₹${Math.round(totalRev / stats.totalBookings)}`, icon: DollarSign, color: "#f97316", bg: "rgba(249,115,22,0.1)", change: "+5%" },
          ].map((card) => (
            <div key={card.label} className="bg-card rounded-2xl p-5 border border-border hover-lift shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <span className="text-xs text-green-600 flex items-center gap-0.5 font-medium">
                  <ArrowUpRight className="w-3 h-3" /> {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Revenue Chart */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">Weekly Revenue Trend</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground px-3 py-1.5 bg-muted rounded-lg">
              <Calendar className="w-3.5 h-3.5" /> Last 7 days
            </div>
          </div>
          <div className="flex items-end gap-4 h-48">
            {stats.weeklyRevenue.map((d) => {
              const max = Math.max(...stats.weeklyRevenue.map(w => w.revenue));
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">₹{(d.revenue / 1000).toFixed(0)}k</span>
                  <div
                    className="w-full gradient-primary rounded-xl transition-all group-hover:opacity-80 cursor-pointer"
                    style={{ height: `${(d.revenue / max) * 100}%`, minHeight: "12px" }}
                    title={`₹${d.revenue.toLocaleString()}`}
                  />
                  <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Revenue Breakdown */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Revenue by Category</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Category</th>
                  <th className="text-right py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Bookings</th>
                  <th className="text-right py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Revenue</th>
                  <th className="text-right py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Commission</th>
                  <th className="text-right py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Share</th>
                </tr>
              </thead>
              <tbody>
                {stats.categoryBreakdown.map((cat) => (
                  <tr key={cat.category} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3.5 font-medium text-foreground">{cat.category}</td>
                    <td className="py-3.5 text-right text-muted-foreground">{cat.bookings.toLocaleString()}</td>
                    <td className="py-3.5 text-right font-semibold text-foreground">₹{(cat.revenue / 1000).toFixed(0)}k</td>
                    <td className="py-3.5 text-right text-green-600 font-medium">₹{((cat.revenue * 0.15) / 1000).toFixed(0)}k</td>
                    <td className="py-3.5 text-right text-muted-foreground">{((cat.revenue / totalRev) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/30 font-semibold">
                  <td className="py-3.5 text-foreground">Total</td>
                  <td className="py-3.5 text-right text-foreground">{stats.totalBookings.toLocaleString()}</td>
                  <td className="py-3.5 text-right text-foreground">₹{(totalRev / 100000).toFixed(1)}L</td>
                  <td className="py-3.5 text-right text-green-600">₹{((totalRev * 0.15) / 100000).toFixed(1)}L</td>
                  <td className="py-3.5 text-right text-foreground">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
