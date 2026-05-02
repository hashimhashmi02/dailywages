import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const [
      totalWorkers,
      activeWorkers,
      totalCustomers,
      totalBookings,
      todayBookings,
      totalRevenue,
      pendingVerifications,
      openDisputes,
      categoryBreakdown,
      weeklyRevenue,
    ] = await Promise.all([
      
      prisma.worker.count(),

      
      prisma.worker.count({
        where: { isOnline: true },
      }),

      prisma.customer.count(),

      prisma.booking.count(),

      prisma.booking.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),

      prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),

      
      prisma.worker.count({
        where: { isVerified: false },
      }),

      
      prisma.dispute.count({
        where: {
          status: { in: ["OPEN", "UNDER_REVIEW"] },
        },
      }),

      prisma.jobCategory.findMany({
        include: {
          _count: {
            select: { jobRequests: true },
          },
        },
        orderBy: {
          jobRequests: {
            _count: "desc",
          },
        },
      }),

      
      prisma.$queryRaw`
        SELECT
          DATE_TRUNC('day', created_at) as day,
          SUM(amount) as revenue
        FROM payments
        WHERE status = 'COMPLETED'
          AND created_at >= NOW() - INTERVAL '7 days'
        GROUP BY DATE_TRUNC('day', created_at)
        ORDER BY day ASC
      `,
    ]);

    const avgRating = await prisma.review.aggregate({
      _avg: { rating: true },
    });

    const stats = {
      totalWorkers,
      activeWorkers,
      totalCustomers,
      totalBookings,
      todayBookings,
      revenue: totalRevenue._sum.amount || 0,
      pendingVerifications,
      openDisputes,
      avgRating: avgRating._avg.rating || 0,
      completionRate: totalBookings > 0
        ? Math.round((activeWorkers / totalWorkers) * 100)
        : 0,
      categoryBreakdown: categoryBreakdown.map((cat: any) => ({
        category: cat.name,
        bookings: cat._count.jobRequests,
      })),
      weeklyRevenue: (weeklyRevenue as any[]).map((row) => ({
        day: new Date(row.day).toLocaleDateString("en-US", { weekday: "short" }),
        revenue: Number(row.revenue) || 0,
      })),
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
