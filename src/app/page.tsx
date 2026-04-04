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
} from "lucide-react";

const CATEGORIES = [
  { name: "Plumber", nameHi: "प्लंबर", icon: Wrench, color: "#3b82f6", jobs: "2,450+", href: "/customer/categories" },
  { name: "Electrician", nameHi: "इलेक्ट्रीशियन", icon: Zap, color: "#f59e0b", jobs: "2,180+", href: "/customer/categories" },
  { name: "Painter", nameHi: "पेंटर", icon: Paintbrush, color: "#8b5cf6", jobs: "1,560+", href: "/customer/categories" },
  { name: "Cleaner", nameHi: "सफाई", icon: Sparkles, color: "#10b981", jobs: "2,870+", href: "/customer/categories" },
  { name: "Carpenter", nameHi: "बढ़ई", icon: Hammer, color: "#f97316", jobs: "1,230+", href: "/customer/categories" },
  { name: "Mover", nameHi: "मूवर्स", icon: Truck, color: "#ef4444", jobs: "890+", href: "/customer/categories" },
  { name: "AC Repair", nameHi: "एसी मरम्मत", icon: Snowflake, color: "#06b6d4", jobs: "780+", href: "/customer/categories" },
  { name: "Mason", nameHi: "राजमिस्त्री", icon: BrickWall, color: "#78716c", jobs: "496+", href: "/customer/categories" },
];

const STATS = [
  { label: "Workers Onboarded", value: "1,200+", icon: Users },
  { label: "Jobs Completed", value: "12,000+", icon: Star },
  { label: "Cities Served", value: "15+", icon: MapPin },
  { label: "Avg Response Time", value: "< 5 min", icon: Clock },
];

const STEPS = [
  { step: 1, title: "Choose a Service", desc: "Pick what you need — plumbing, electrical, cleaning, and more." },
  { step: 2, title: "Get Matched Instantly", desc: "We find the nearest verified worker available right now." },
  { step: 3, title: "Track & Pay", desc: "Track your worker live, pay securely after the job is done." },
];

const TESTIMONIALS = [
  { name: "Priya M.", location: "New Delhi", rating: 5, text: "Called a plumber at 7 AM. He arrived in 20 minutes and fixed everything. The UPI payment was seamless!", avatar: "P" },
  { name: "Amit K.", location: "Noida", rating: 5, text: "The painters did an amazing textured wall finish in my living room. Professional and on time.", avatar: "A" },
  { name: "Sunita D.", location: "Gurugram", rating: 4, text: "Love how easy it is to book cleaners. The deep cleaning service was thorough. Will use again!", avatar: "S" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Daily<span className="text-gradient">Wages</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/customer/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/worker/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                For Workers
              </Link>
              <Link href="/admin/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
              <Link
                href="/customer/dashboard"
                className="px-5 py-2.5 gradient-primary text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-md"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 animate-fade-in">
              <div className="flex flex-col gap-3">
                <Link href="/customer/categories" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">Services</Link>
                <Link href="/worker/dashboard" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">For Workers</Link>
                <Link href="/admin/dashboard" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">Admin</Link>
                <Link href="/customer/dashboard" className="px-4 py-2.5 gradient-primary text-white text-sm font-semibold rounded-full text-center hover:opacity-90 transition-opacity">Book Now</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="gradient-hero text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 -right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-orange-200 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot" />
              389 workers online now
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Skilled Workers,{" "}
              <span className="text-gradient">One Tap</span> Away
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-4 max-w-2xl leading-relaxed">
              Connect with verified plumbers, electricians, painters, and more from your neighborhood.
              Book instantly, track live, pay securely.
            </p>
            <p className="text-sm text-slate-400 mb-8">
              कुशल मज़दूर, एक टैप पर — अपने मोहल्ले के वेरिफाइड कारीगर बुक करें
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/customer/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-orange-500/25 text-lg"
              >
                Book a Worker
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/worker/onboarding"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm text-lg"
              >
                Join as Worker
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories Grid ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              What do you need done?
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from our wide range of services
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover-lift"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  <cat.icon className="w-7 h-7" style={{ color: cat.color }} />
                </div>
                <h3 className="font-semibold text-foreground mb-0.5">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{cat.nameHi}</p>
                <p className="text-xs text-primary font-medium">{cat.jobs} jobs done</p>
                <ChevronRight className="absolute top-6 right-5 w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────────────────────────── */}
      <section className="gradient-warm py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              How DailyWages Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to get your job done
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-500/20">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Signals ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Verified Workers</h3>
              <p className="text-sm text-muted-foreground">Every worker is Aadhaar-verified and background-checked for your safety.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">No hidden charges. See prices upfront before you book. Pay via UPI or cash.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Instant Booking</h3>
              <p className="text-sm text-muted-foreground">Workers arrive within minutes. Real-time tracking so you know exactly when.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────────────── */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover-lift">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
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
      <section className="gradient-hero text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Whether you need a quick repair or a full renovation — DailyWages connects you with the right worker in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customer/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg"
            >
              Hire a Worker Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/worker/onboarding"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Register as Worker
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold">DailyWages</span>
              </div>
              <p className="text-sm leading-relaxed">Connecting skilled workers with households across India.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/customer/categories" className="hover:text-white transition-colors">Plumber</Link>
                <Link href="/customer/categories" className="hover:text-white transition-colors">Electrician</Link>
                <Link href="/customer/categories" className="hover:text-white transition-colors">Painter</Link>
                <Link href="/customer/categories" className="hover:text-white transition-colors">Cleaner</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="#" className="hover:text-white transition-colors">About Us</Link>
                <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© {new Date().getFullYear()} DailyWages. All rights reserved.</p>
            <p className="text-xs">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
