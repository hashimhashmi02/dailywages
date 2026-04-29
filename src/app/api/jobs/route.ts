import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const workerId = searchParams.get("workerId");
    const customerId = searchParams.get("customerId");

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (workerId) {
      where.workerId = workerId;
    }

    if (customerId) {
      where.jobRequest = {
        customerId,
      };
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        jobRequest: {
          include: {
            customer: {
              include: {
                user: true,
              },
            },
            category: true,
          },
        },
        worker: {
          include: {
            user: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobRequestId, workerId, totalAmount, paymentMethod } = body;

    const booking = await prisma.booking.create({
      data: {
        jobRequestId,
        workerId,
        totalAmount,
        paymentMethod: paymentMethod || "UPI",
        status: "ACCEPTED",
      },
      include: {
        jobRequest: {
          include: {
            customer: true,
            category: true,
          },
        },
        worker: {
          include: {
            user: true,
          },
        },
      },
    });

    // Update job request status
    await prisma.jobRequest.update({
      where: { id: jobRequestId },
      data: { status: "ACCEPTED" },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
