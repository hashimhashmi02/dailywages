"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Wrench,
  Zap,
  Paintbrush,
  Sparkles,
  Hammer,
  Truck,
  Snowflake,
  BrickWall,
  MapPin,
  Star,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  Menu,
  X,
  Phone,
  CheckCircle2,
  Play,
} from "lucide-react";

const CATEGORIES = [
  { name: "Plumber", nameHi: "प्लंबर", icon: Wrench, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", jobs: "2,450+", href: "/customer/categories" },
  { name: "Electrician", nameHi: "इलेक्ट्रीशियन", icon: Zap, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", jobs: "2,180+", href: "/customer/categories" },
  { name: "Painter", nameHi: "पेंटर", icon: Paintbrush, color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", jobs: "1,560+", href: "/customer/categories" },
  { name: "Cleaner", nameHi: "सफाई", icon: Sparkles, color: "#10b981", bg: "rgba(16,185,129,0.08)", jobs: "2,870+", href: "/customer/categories" },
  { name: "Carpenter", nameHi: "बढ़ई", icon: Hammer, color: "#f97316", bg: "rgba(249,115,22,0.08)", jobs: "1,230+", href: "/customer/categories" },
  { name: "Mover", nameHi: "मूवर्स", icon: Truck, color: "#ef4444", bg: "rgba(239,68,68,0.08)", jobs: "890+", href: "/customer/categories" },
  { name: "AC Repair", nameHi: "एसी मरम्मत", icon: Snowflake, color: "#06b6d4", bg: "rgba(6,182,212,0.08)", jobs: "780+", href: "/customer/categories" },
  { name: "Mason", nameHi: "राजमिस्त्री", icon: BrickWall, color: "#78716c", bg: "rgba(120,113,108,0.08)", jobs: "496+", href: "/customer/categories" },
];

const STATS = [
  { label: "Workers Onboarded", value: "1,200+", icon: Users, color: "#3b82f6" },
  { label: "Jobs Completed", value: "12,000+", icon: Star, color: "#f59e0b" },
  { label: "Cities Served", value: "15+", icon: MapPin, color: "#10b981" },
  { label: "Avg Response", value: "< 5 min", icon: Clock, color: "#8b5cf6" },
];

const STEPS = [
  { step: 1, title: "Choose a Service", desc: "Pick what you need — plumbing, electrical, cleaning, and more.", icon: "🔧" },
  { step: 2, title: "Get Matched Instantly", desc: "We find the nearest verified worker available in your area right now.", icon: "⚡" },
  { step: 3, title: "Track & Pay Securely", desc: "Track your worker live on the map, pay securely via UPI or cash.", icon: "✅" },
];

const TESTIMONIALS = [
  { name: "Priya M.", location: "New Delhi", rating: 5, text: "Called a plumber at 7 AM. He arrived in 20 minutes and fixed everything. The UPI payment was seamless!", avatar: "P" },
  { name: "Amit K.", location: "Noida", rating: 5, text: "The painters did an amazing textured wall finish in my living room. Professional and on time.", avatar: "A" },
  { name: "Sunita D.", location: "Gurugram", rating: 4, text: "Love how easy it is to book cleaners. The deep cleaning service was thorough. Will use again!", avatar: "S" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen page-transition">
      {/* ─── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 header-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Daily<span className="text-gradient">Wages</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/customer/categories" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-all">
                Services
              </Link>
              <Link href="/worker/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-all">
                For Workers
              </Link>
              <Link href="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-all">
                Admin
              </Link>
              <div className="w-px h-6 bg-border mx-2" />
              <Link
                href="/customer/dashboard"
                className="px-6 py-2.5 gradient-primary text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 animate-slide-down">
              <div className="flex flex-col gap-1">
                <Link href="/customer/categories" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-muted transition-colors">Services</Link>
                <Link href="/worker/dashboard" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-muted transition-colors">For Workers</Link>
                <Link href="/admin/dashboard" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-muted transition-colors">Admin</Link>
                <div className="pt-2 px-3">
                  <Link href="/customer/dashboard" className="block py-3 gradient-primary text-white text-sm font-semibold rounded-xl text-center hover:opacity-90 transition-opacity">Book Now</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
          <div className="max-w-3xl">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] text-sm text-slate-300 mb-8 backdrop-blur-md animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="font-medium">389 workers online now</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-8 animate-slide-up">
              Skilled Workers,{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                One Tap
              </span>
              {" "}Away
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 mb-4 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
              Connect with verified plumbers, electricians, painters, and more from your neighborhood.
              Book instantly, track live, pay securely.
            </p>
            <p className="text-sm text-slate-500 mb-10 animate-slide-up" style={{ animationDelay: '150ms' }}>
              कुशल मज़दूर, एक टैप पर — अपने मोहल्ले के वेरिफाइड कारीगर बुक करें
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link
                href="/customer/dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl shadow-orange-500/25 text-lg group"
              >
                Book a Worker
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/worker/onboarding"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/[0.08] border border-white/[0.15] text-white font-semibold rounded-2xl hover:bg-white/[0.14] transition-all backdrop-blur-sm text-lg"
              >
                Join as Worker
              </Link>
            </div>
          </div>
        </div>

        {/* Stats inside hero, floating at bottom */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white/[0.06] backdrop-blur-md border border-white/[0.1] rounded-2xl p-5 animate-slide-up"
                style={{ animationDelay: `${250 + i * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories Grid ─────────────────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-xs font-semibold tracking-wide uppercase mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              What do you need done?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our wide range of professional services
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 stagger-children">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative p-6 bg-card rounded-2xl border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 shadow-sm overflow-hidden"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${cat.bg}, transparent)` }}
                />
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: cat.bg, boxShadow: 'none' }}
                  >
                    <cat.icon className="w-7 h-7 transition-colors" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-0.5 text-base">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2.5">{cat.nameHi}</p>
                  <p className="text-xs font-semibold" style={{ color: cat.color }}>{cat.jobs} jobs done</p>
                </div>
                <ChevronRight className="absolute top-6 right-5 w-4 h-4 text-border group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 sm:py-24 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-xs font-semibold tracking-wide uppercase mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Three simple steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Get your job done in minutes, not days
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="bg-card rounded-2xl p-7 border border-border hover-lift shadow-sm text-center relative">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2.5">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Signals ───────────────────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide uppercase mb-4">
              Why DailyWages
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Built on Trust
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, color: "#22c55e", bg: "rgba(34,197,94,0.08)", title: "Verified Workers", desc: "Every worker is Aadhaar-verified and background-checked for your complete safety and peace of mind." },
              { icon: DollarSign, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", title: "Transparent Pricing", desc: "No hidden charges. See prices upfront before you book. Pay conveniently via UPI, wallet, or cash." },
              { icon: Clock, color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", title: "Instant Booking", desc: "Workers arrive within minutes. Real-time GPS tracking so you know exactly when they'll reach you." },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-8 border border-border hover-lift shadow-sm group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────────────── */}
      <section className="bg-muted py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold tracking-wide uppercase mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Loved by thousands
            </h2>
            <p className="text-muted-foreground text-lg">
              Real feedback from real customers across India
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-7 shadow-sm border border-border hover-lift group">
                <div className="flex items-center gap-1.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-orange-500/15">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950" />
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you need a quick repair or a full renovation — DailyWages connects you with the right worker in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customer/dashboard"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl shadow-orange-500/25 text-lg group"
            >
              Hire a Worker Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/worker/onboarding"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/[0.08] border border-white/[0.15] text-white font-semibold rounded-2xl hover:bg-white/[0.14] transition-all"
            >
              <Phone className="w-5 h-5" />
              Register as Worker
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">DailyWages</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Connecting skilled workers with households across India. Fast, reliable, trusted.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Services</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link href="/customer/categories" className="hover:text-white transition-colors">Plumber</Link>
                <Link href="/customer/categories" className="hover:text-white transition-colors">Electrician</Link>
                <Link href="/customer/categories" className="hover:text-white transition-colors">Painter</Link>
                <Link href="/customer/categories" className="hover:text-white transition-colors">Cleaner</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link href="#" className="hover:text-white transition-colors">About Us</Link>
                <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">© 2026 DailyWages. All rights reserved.</p>
            <p className="text-xs text-slate-600">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
