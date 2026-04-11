"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Upload,
  Camera,
  User,
  Phone,
  Mail,
  CreditCard,
  Check,
  ChevronRight,
  Shield,
} from "lucide-react";
import { JOB_CATEGORIES } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";
import { showToast } from "@/components/Toast";

const STEPS = ["Personal Info", "ID Verification", "Skills & Rates", "Review"];

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  aadhaar: string;
  hourlyRate: string;
  bio: string;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    aadhaar: "",
    hourlyRate: "",
    bio: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (catId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(catId) ? prev.filter((s) => s !== catId) : [...prev, catId]
    );
  };

  const handleNext = () => {
    if (step === 0 && !form.fullName.trim()) {
      showToast("Please enter your full name", "warning");
      return;
    }
    if (step === 0 && !form.phone.trim()) {
      showToast("Please enter your phone number", "warning");
      return;
    }
    if (step === 2 && selectedSkills.length === 0) {
      showToast("Please select at least one skill", "warning");
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <PageHeader title="Worker Registration" backHref="/">
        {/* Step indicator */}
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "gradient-primary" : "bg-border"}`} />
              <p className={`text-[10px] mt-1 ${i <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>{s}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div className="space-y-6 animate-fade-in">
            {/* Photo Upload */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center mb-3 cursor-pointer hover:border-primary transition-colors">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Upload your photo</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
                <textarea
                  rows={3}
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Enter your full address..."
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none bg-card text-foreground"
                />
              </div>
            </div>
            <button onClick={handleNext} className="w-full py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg">Continue</button>
          </div>
        )}

        {/* Step 1: ID Verification */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
              <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Identity Verification</p>
                <p className="text-xs text-blue-700">Your documents are encrypted and securely stored. We verify your identity to build trust with customers.</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Aadhaar Number</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={form.aadhaar}
                  onChange={(e) => updateField("aadhaar", e.target.value)}
                  placeholder="1234 5678 9012"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Upload Documents</label>
              <div className="space-y-3">
                {["Aadhaar Card (Front)", "Aadhaar Card (Back)", "Photo ID (Optional)"].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{doc}</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG or PDF, max 5MB</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-4 border border-border rounded-2xl font-semibold text-foreground hover:bg-muted transition-colors">Back</button>
              <button onClick={handleNext} className="flex-1 py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg">Continue</button>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Select Your Skills *</label>
              <div className="grid grid-cols-2 gap-3">
                {JOB_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleSkill(cat.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                      selectedSkills.includes(cat.id) ? "border-primary bg-primary-light" : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">₹{cat.basePrice}/hr</p>
                    </div>
                    {selectedSkills.includes(cat.id) && (
                      <Check className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Hourly Rate (₹)</label>
              <input
                type="number"
                value={form.hourlyRate}
                onChange={(e) => updateField("hourlyRate", e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">Average rate for your skills: ₹400-600/hr</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Bio / Experience</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                placeholder="Tell customers about your experience and expertise..."
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none bg-card text-foreground"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-4 border border-border rounded-2xl font-semibold text-foreground hover:bg-muted transition-colors">Back</button>
              <button onClick={handleNext} className="flex-1 py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h2>
              <p className="text-muted-foreground">Your profile is under review. We&apos;ll verify your documents within 24-48 hours.</p>
            </div>

            {/* Summary of submitted info */}
            {form.fullName && (
              <div className="bg-card rounded-2xl p-5 border border-border space-y-2">
                <h3 className="font-semibold text-foreground mb-2">Your Submission</h3>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Name:</span> {form.fullName}</p>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Phone:</span> {form.phone}</p>
                {form.email && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Email:</span> {form.email}</p>}
                {selectedSkills.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Skills:</span>{" "}
                    {selectedSkills.map((id) => JOB_CATEGORIES.find((c) => c.id === id)?.name).filter(Boolean).join(", ")}
                  </p>
                )}
                {form.hourlyRate && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Rate:</span> ₹{form.hourlyRate}/hr</p>}
              </div>
            )}

            <div className="bg-card rounded-2xl p-5 border border-border space-y-3">
              <h3 className="font-semibold text-foreground">What happens next?</h3>
              {[
                "Our team reviews your documents",
                "You'll receive verification confirmation via SMS",
                "Once verified, toggle online and start receiving jobs!",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href="/worker/dashboard"
              className="block w-full py-4 gradient-primary text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md text-lg text-center"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
