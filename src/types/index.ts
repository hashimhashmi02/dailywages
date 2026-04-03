// DailyWages — Core TypeScript Types

export type UserRole = "CUSTOMER" | "WORKER" | "ADMIN";
export type JobStatus = "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type PaymentMethod = "UPI" | "WALLET" | "CASH";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type DisputeStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED" | "CLOSED";
export type BookingType = "INSTANT" | "SCHEDULED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Worker {
  id: string;
  userId: string;
  user: User;
  aadhaarNumber?: string;
  skills: string[];
  bio: string;
  hourlyRate: number;
  isVerified: boolean;
  isOnline: boolean;
  rating: number;
  totalJobs: number;
  latitude: number;
  longitude: number;
  categoryId: string;
  category: JobCategory;
}

export interface Customer {
  id: string;
  userId: string;
  user: User;
  address: string;
  latitude: number;
  longitude: number;
}

export interface JobCategory {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  description: string;
  basePrice: number;
  image: string;
}

export interface JobRequest {
  id: string;
  customerId: string;
  customer: Customer;
  categoryId: string;
  category: JobCategory;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  scheduledAt?: Date;
  bookingType: BookingType;
  status: JobStatus;
  urgency: "LOW" | "NORMAL" | "URGENT";
  createdAt: Date;
}

export interface Booking {
  id: string;
  jobRequestId: string;
  jobRequest: JobRequest;
  workerId: string;
  worker: Worker;
  status: JobStatus;
  startedAt?: Date;
  completedAt?: Date;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  fromUser: User;
  toUser: User;
  createdAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
}

export interface Earning {
  id: string;
  workerId: string;
  amount: number;
  commission: number;
  netAmount: number;
  paidAt?: Date;
  createdAt: Date;
}

export interface Dispute {
  id: string;
  bookingId: string;
  booking: Booking;
  raisedBy: User;
  reason: string;
  status: DisputeStatus;
  resolution?: string;
  createdAt: Date;
}

export interface LocationUpdate {
  userId: string;
  latitude: number;
  longitude: number;
  updatedAt: Date;
}
