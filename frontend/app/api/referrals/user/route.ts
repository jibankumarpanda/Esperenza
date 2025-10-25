import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('📋 Fetching user referrals API called');
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      console.log('❌ User ID is required');
      return NextResponse.json({ 
        error: 'User ID is required' 
      }, { status: 400 });
    }

    const prisma = getPrisma();

    // Fetch user referrals
    const referrals = await prisma.referral.findMany({
      where: {
        userId: parseInt(userId)
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('✅ User referrals fetched:', referrals.length);
    return NextResponse.json({
      success: true,
      referrals: referrals.map(referral => ({
        id: referral.id,
        platform: referral.platform,
        code: referral.code,
        description: referral.description,
        reward: referral.reward,
        uses: referral.uses,
        createdAt: referral.createdAt
      }))
    });

  } catch (error: any) {
    console.error('Fetch user referrals error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch referrals' 
    }, { status: 500 });
  }
}
