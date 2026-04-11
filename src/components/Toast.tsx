"use client";

import { useEffect, useState } from "react";
import { Check, X, AlertTriangle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

// Global toast state
let toastListeners: ((toasts: ToastData[]) => void)[] = [];
let toasts: ToastData[] = [];

function notifyListeners() {
  toastListeners.forEach((fn) => fn([...toasts]));
}

export function showToast(message: string, type: ToastType = "success") {
  const id = Math.random().toString(36).slice(2, 9);
  toasts = [...toasts, { id, message, type }];
  notifyListeners();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 3500);
}

const icons: Record<ToastType, React.ElementType> = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
};

const styles: Record<ToastType, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-amber-500",
  info: "bg-blue-600",
};

export default function ToastContainer() {
  const [items, setItems] = useState<ToastData[]>([]);

  useEffect(() => {
    toastListeners.push(setItems);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setItems);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm" role="alert" aria-live="polite">
      {items.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`${styles[toast.type]} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-up`}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => {
                toasts = toasts.filter((t) => t.id !== toast.id);
                notifyListeners();
              }}
              className="ml-auto p-1 hover:bg-white/20 rounded-lg transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
