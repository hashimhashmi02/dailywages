import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastContainer from "@/components/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DailyWages — Skilled Workers, One Tap Away",
  description:
    "Connect with verified daily-wage workers instantly. Plumbers, electricians, painters, cleaners, carpenters, and more — available on demand at your doorstep.",
  keywords: [
    "daily wage workers",
    "plumber near me",
    "electrician on demand",
    "house cleaning service",
    "labor hire India",
    "mazdoor",
    "DailyWages",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <ToastContainer />
      </body>
    </html>
  );
}
