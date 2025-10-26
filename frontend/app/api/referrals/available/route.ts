import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Fetching available referrals API called');
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const prisma = getPrisma();

    // Build where clause
    const whereClause: any = {
      isActive: true
    };

    // Add category filter if provided
    if (category && category !== 'all') {
      whereClause.category = category;
    }

    // Add search filter if provided
    if (search) {
      whereClause.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { reward: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Fetch available referrals (without provider details)
    const referrals = await prisma.referral.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        code: true,
        reward: true,
        description: true,
        category: true,
        maxUsage: true,
        usageCount: true,
        isActive: true,
        createdAt: true,
        // Don't include userId or provider details
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('✅ Available referrals fetched:', referrals.length);
    return NextResponse.json({
      success: true,
      referrals: referrals.map((referral: any) => ({
        id: referral.id,
        name: referral.name,
        code: referral.code,
        reward: referral.reward,
        description: referral.description,
        category: referral.category,
        maxUsage: referral.maxUsage,
        usageCount: referral.usageCount,
        isActive: referral.isActive,
        createdAt: referral.createdAt,
        // Calculate availability
        isAvailable: referral.isActive && 
          (referral.maxUsage === null || referral.usageCount < referral.maxUsage)
      }))
    });

  } catch (error: any) {
    console.error('Fetch available referrals error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch available referrals' 
    }, { status: 500 });
  }
}
