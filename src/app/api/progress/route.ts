import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    if (!progress) {
      return NextResponse.json({
        completedFlashcards: [],
        completedExams: [],
        examScores: {},
      });
    }

    return NextResponse.json({
      ...progress,
      completedFlashcards: JSON.parse(progress.completedFlashcards || '[]'),
      completedExams: JSON.parse(progress.completedExams || '[]'),
      examScores: JSON.parse(progress.examScores || '{}'),
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
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
    const progress = await prisma.userProgress.upsert({
      where: { userId },
      create: {
        userId,
        completedFlashcards: JSON.stringify(body.completedFlashcards || []),
        completedExams: JSON.stringify(body.completedExams || []),
        examScores: JSON.stringify(body.examScores || {}),
      },
      update: {
        completedFlashcards: JSON.stringify(body.completedFlashcards || []),
        completedExams: JSON.stringify(body.completedExams || []),
        examScores: JSON.stringify(body.examScores || {}),
      },
    });

    return NextResponse.json({
      ...progress,
      completedFlashcards: JSON.parse(progress.completedFlashcards),
      completedExams: JSON.parse(progress.completedExams),
      examScores: JSON.parse(progress.examScores),
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}