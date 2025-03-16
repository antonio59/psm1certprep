import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const examHistory = await prisma.examHistory.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });

    return NextResponse.json(examHistory);
  } catch (error) {
    console.error('Error fetching exam history:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const examResult = await prisma.examHistory.create({
      data: {
        userId,
        ...body,
      },
    });

    return NextResponse.json(examResult);
  } catch (error) {
    console.error('Error saving exam result:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}