import { JobCategory, Worker, Customer, JobRequest, Booking, Review, User } from "@/types";

// ─── Job Categories ─────────────────────────────────────────────────────────
export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: "cat-1",
    name: "Plumber",
    nameHi: "प्लंबर",
    icon: "🔧",
    description: "Fix leaks, install pipes, bathroom fittings",
    basePrice: 500,
    image: "/categories/plumber.jpg",
  },
  {
    id: "cat-2",
    name: "Electrician",
    nameHi: "इलेक्ट्रीशियन",
    icon: "⚡",
    description: "Wiring, switches, fan installation, repairs",
    basePrice: 400,
    image: "/categories/electrician.jpg",
  },
  {
    id: "cat-3",
    name: "Painter",
    nameHi: "पेंटर",
    icon: "🎨",
    description: "Wall painting, polishing, waterproofing",
    basePrice: 600,
    image: "/categories/painter.jpg",
  },
  {
    id: "cat-4",
    name: "Cleaner",
    nameHi: "सफाई कर्मचारी",
    icon: "🧹",
    description: "Deep cleaning, bathroom, kitchen, full house",
    basePrice: 350,
    image: "/categories/cleaner.jpg",
  },
  {
    id: "cat-5",
    name: "Carpenter",
    nameHi: "बढ़ई",
    icon: "🪚",
    description: "Furniture repair, door fitting, woodwork",
    basePrice: 550,
    image: "/categories/carpenter.jpg",
  },
  {
    id: "cat-6",
    name: "Mover",
    nameHi: "पैकर्स एंड मूवर्स",
    icon: "📦",
    description: "House shifting, loading, unloading",
    basePrice: 800,
    image: "/categories/mover.jpg",
  },
  {
    id: "cat-7",
    name: "AC Repair",
    nameHi: "एसी मरम्मत",
    icon: "❄️",
    description: "AC servicing, gas filling, installation",
    basePrice: 700,
    image: "/categories/ac-repair.jpg",
  },
  {
    id: "cat-8",
    name: "Mason",
    nameHi: "राजमिस्त्री",
    icon: "🧱",
    description: "Brickwork, tiling, plastering, construction",
    basePrice: 650,
    image: "/categories/mason.jpg",
  },
];

// ─── Mock Users ─────────────────────────────────────────────────────────────
export const MOCK_USERS: User[] = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", phone: "+919876543210", role: "CUSTOMER", avatar: "", createdAt: new Date("2025-06-15") },
  { id: "u2", name: "Priya Patel", email: "priya@example.com", phone: "+919876543211", role: "CUSTOMER", avatar: "", createdAt: new Date("2025-07-20") },
  { id: "u3", name: "Suresh Kumar", email: "suresh@example.com", phone: "+919876543212", role: "WORKER", avatar: "", createdAt: new Date("2025-03-10") },
  { id: "u4", name: "Mohan Yadav", email: "mohan@example.com", phone: "+919876543213", role: "WORKER", avatar: "", createdAt: new Date("2025-04-05") },
  { id: "u5", name: "Ravi Singh", email: "ravi@example.com", phone: "+919876543214", role: "WORKER", avatar: "", createdAt: new Date("2025-02-18") },
  { id: "u6", name: "Anita Devi", email: "anita@example.com", phone: "+919876543215", role: "WORKER", avatar: "", createdAt: new Date("2025-05-22") },
  { id: "u7", name: "Vikram Thakur", email: "vikram@example.com", phone: "+919876543216", role: "WORKER", avatar: "", createdAt: new Date("2025-01-30") },
  { id: "u8", name: "Admin User", email: "admin@dailywages.in", phone: "+919999999999", role: "ADMIN", avatar: "", createdAt: new Date("2025-01-01") },
];

// ─── Mock Workers ───────────────────────────────────────────────────────────
export const MOCK_WORKERS: Worker[] = [
  {
    id: "w1", userId: "u3", user: MOCK_USERS[2],
    skills: ["Pipe fitting", "Leak repair", "Bathroom installation"],
    bio: "15 years experience in plumbing. Specialist in bathroom fittings and leak repair.",
    hourlyRate: 500, isVerified: true, isOnline: true, rating: 4.8, totalJobs: 342,
    latitude: 28.6139, longitude: 77.2090, categoryId: "cat-1", category: JOB_CATEGORIES[0],
  },
  {
    id: "w2", userId: "u4", user: MOCK_USERS[3],
    skills: ["House wiring", "Fan installation", "Switch repair"],
    bio: "Licensed electrician with 10+ years of experience. Safe and reliable.",
    hourlyRate: 450, isVerified: true, isOnline: true, rating: 4.6, totalJobs: 218,
    latitude: 28.6229, longitude: 77.2195, categoryId: "cat-2", category: JOB_CATEGORIES[1],
  },
  {
    id: "w3", userId: "u5", user: MOCK_USERS[4],
    skills: ["Wall painting", "Waterproofing", "Texture work"],
    bio: "Expert painter specializing in texture and designer wall finishes.",
    hourlyRate: 600, isVerified: true, isOnline: false, rating: 4.9, totalJobs: 156,
    latitude: 28.6351, longitude: 77.2250, categoryId: "cat-3", category: JOB_CATEGORIES[2],
  },
  {
    id: "w4", userId: "u6", user: MOCK_USERS[5],
    skills: ["Deep cleaning", "Kitchen cleaning", "Bathroom cleaning"],
    bio: "Professional cleaner. Thorough, punctual, and detail-oriented.",
    hourlyRate: 350, isVerified: true, isOnline: true, rating: 4.7, totalJobs: 487,
    latitude: 28.6100, longitude: 77.2300, categoryId: "cat-4", category: JOB_CATEGORIES[3],
  },
  {
    id: "w5", userId: "u7", user: MOCK_USERS[6],
    skills: ["Furniture repair", "Door fitting", "Cabinet making"],
    bio: "Master carpenter with expertise in custom furniture and repairs.",
    hourlyRate: 550, isVerified: false, isOnline: true, rating: 4.5, totalJobs: 93,
    latitude: 28.6280, longitude: 77.2150, categoryId: "cat-5", category: JOB_CATEGORIES[4],
  },
];

// ─── Mock Customers ─────────────────────────────────────────────────────────
export const MOCK_CUSTOMERS: Customer[] = [
  { id: "c1", userId: "u1", user: MOCK_USERS[0], address: "A-12, Safdarjung Enclave, New Delhi", latitude: 28.5575, longitude: 77.2022 },
  { id: "c2", userId: "u2", user: MOCK_USERS[1], address: "B-45, Hauz Khas, New Delhi", latitude: 28.5494, longitude: 77.2001 },
];

// ─── Mock Job Requests ──────────────────────────────────────────────────────
export const MOCK_JOB_REQUESTS: JobRequest[] = [
  {
    id: "jr1", customerId: "c1", customer: MOCK_CUSTOMERS[0],
    categoryId: "cat-1", category: JOB_CATEGORIES[0],
    description: "Kitchen sink leaking badly. Need urgent repair.",
    address: "A-12, Safdarjung Enclave, New Delhi",
    latitude: 28.5575, longitude: 77.2022,
    bookingType: "INSTANT", status: "PENDING", urgency: "URGENT",
    createdAt: new Date("2026-04-03T10:30:00"),
  },
  {
    id: "jr2", customerId: "c2", customer: MOCK_CUSTOMERS[1],
    categoryId: "cat-2", category: JOB_CATEGORIES[1],
    description: "Need to install new fan in bedroom and fix switches in hall.",
    address: "B-45, Hauz Khas, New Delhi",
    latitude: 28.5494, longitude: 77.2001,
    scheduledAt: new Date("2026-04-05T14:00:00"),
    bookingType: "SCHEDULED", status: "PENDING", urgency: "NORMAL",
    createdAt: new Date("2026-04-03T11:00:00"),
  },
];

// ─── Mock Bookings ──────────────────────────────────────────────────────────
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1", jobRequestId: "jr1", jobRequest: MOCK_JOB_REQUESTS[0],
    workerId: "w1", worker: MOCK_WORKERS[0],
    status: "IN_PROGRESS",
    startedAt: new Date("2026-04-03T10:45:00"),
    totalAmount: 750, paymentMethod: "UPI",
    createdAt: new Date("2026-04-03T10:35:00"),
  },
];

// ─── Mock Reviews ───────────────────────────────────────────────────────────
export const MOCK_REVIEWS: Review[] = [
  { id: "r1", bookingId: "b1", rating: 5, comment: "Excellent work! Fixed the leak in 30 minutes. Very professional.", fromUser: MOCK_USERS[0], toUser: MOCK_USERS[2], createdAt: new Date("2026-04-01") },
  { id: "r2", bookingId: "b1", rating: 4, comment: "Good electrician. Came on time and did quality work.", fromUser: MOCK_USERS[1], toUser: MOCK_USERS[3], createdAt: new Date("2026-03-28") },
  { id: "r3", bookingId: "b1", rating: 5, comment: "Best painter I've hired. Beautiful texture work on walls.", fromUser: MOCK_USERS[0], toUser: MOCK_USERS[4], createdAt: new Date("2026-03-25") },
];

// ─── App Config ─────────────────────────────────────────────────────────────
export const APP_CONFIG = {
  name: "DailyWages",
  tagline: "Skilled Workers, One Tap Away",
  taglineHi: "कुशल मज़दूर, एक टैप पर",
  currency: "₹",
  commissionRate: 0.15, // 15% platform commission
  supportPhone: "+911800123456",
  supportEmail: "support@dailywages.in",
};

// ─── Stats for Admin ────────────────────────────────────────────────────────
export const MOCK_ADMIN_STATS = {
  totalWorkers: 1247,
  activeWorkers: 389,
  totalCustomers: 5823,
  totalBookings: 12456,
  revenue: 2847500,
  pendingVerifications: 23,
  openDisputes: 7,
  completionRate: 94.2,
  avgRating: 4.6,
  todayBookings: 47,
  weeklyRevenue: [
    { day: "Mon", revenue: 42000 },
    { day: "Tue", revenue: 38000 },
    { day: "Wed", revenue: 51000 },
    { day: "Thu", revenue: 47000 },
    { day: "Fri", revenue: 55000 },
    { day: "Sat", revenue: 63000 },
    { day: "Sun", revenue: 34000 },
  ],
  categoryBreakdown: [
    { category: "Plumber", bookings: 2450, revenue: 612500 },
    { category: "Electrician", bookings: 2180, revenue: 490500 },
    { category: "Painter", bookings: 1560, revenue: 468000 },
    { category: "Cleaner", bookings: 2870, revenue: 430500 },
    { category: "Carpenter", bookings: 1230, revenue: 369000 },
    { category: "Mover", bookings: 890, revenue: 356000 },
    { category: "AC Repair", bookings: 780, revenue: 273000 },
    { category: "Mason", bookings: 496, revenue: 161200 },
  ],
};
