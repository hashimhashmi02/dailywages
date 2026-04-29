import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const online = searchParams.get("online");
    const verified = searchParams.get("verified");

    const where: any = {};

    if (category) {
      where.category = { name: category };
    }

    if (online === "true") {
      where.isOnline = true;
    }

    if (verified === "true") {
      where.isVerified = true;
    }

    const workers = await prisma.worker.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        category: true,
      },
      orderBy: {
        rating: "desc",
      },
    });

    return NextResponse.json({ workers });
  } catch (error) {
    console.error("Error fetching workers:", error);
    return NextResponse.json(
      { error: "Failed to fetch workers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, categoryId, skills, bio, hourlyRate, latitude, longitude } = body;

    const worker = await prisma.worker.create({
      data: {
        userId,
        categoryId,
        skills: skills || [],
        bio,
        hourlyRate: hourlyRate || 400,
        latitude,
        longitude,
      },
      include: {
        user: true,
        category: true,
      },
    });

    return NextResponse.json({ worker }, { status: 201 });
  } catch (error) {
    console.error("Error creating worker:", error);
    return NextResponse.json(
      { error: "Failed to create worker" },
      { status: 500 }
    );
  }
}
