import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('🏆 Fetching user points API called');
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      console.log('❌ User ID is required');
      return NextResponse.json({ 
        error: 'User ID is required' 
      }, { status: 400 });
    }

    const prisma = getPrisma();

    // Fetch user points
    const points = await prisma.userPoints.findMany({
      where: {
        userId: parseInt(userId)
      },
      select: {
        id: true,
        points: true,
        source: true,
        description: true,
        referralId: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate total points
    const totalPoints = points.reduce((sum, point) => sum + point.points, 0);

    console.log('✅ User points fetched:', { count: points.length, total: totalPoints });
    return NextResponse.json({
      success: true,
      points: points.map(point => ({
        id: point.id,
        points: point.points,
        source: point.source,
        description: point.description,
        referralId: point.referralId,
        createdAt: point.createdAt
      })),
      totalPoints
    });

  } catch (error: any) {
    console.error('Fetch user points error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch user points' 
    }, { status: 500 });
  }
}
