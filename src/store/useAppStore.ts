import { create } from "zustand";
import { UserRole } from "@/types";

interface AppState {
  // Current user role for demo navigation
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Worker online/offline toggle
  isWorkerOnline: boolean;
  toggleWorkerOnline: () => void;

  // Selected category for booking flow
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;

  // Booking in progress
  selectedWorkerId: string | null;
  setSelectedWorkerId: (id: string | null) => void;

  // Mobile sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentRole: "CUSTOMER",
  setCurrentRole: (role) => set({ currentRole: role }),

  isWorkerOnline: false,
  toggleWorkerOnline: () => set((state) => ({ isWorkerOnline: !state.isWorkerOnline })),

  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),

  selectedWorkerId: null,
  setSelectedWorkerId: (id) => set({ selectedWorkerId: id }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
