import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('🎯 Referral selection API called');
    const { referralId, userId } = await request.json();
    console.log('📊 Selection data:', { referralId, userId });

    if (!referralId || !userId) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ 
        error: 'Referral ID and user ID are required' 
      }, { status: 400 });
    }

    const prisma = getPrisma();

    // Get the referral with provider details
    const referral = await prisma.referral.findUnique({
      where: { id: parseInt(referralId) },
      include: {
        user: {
          select: {
            id: true,
            phoneE164: true,
            walletAddress: true
          }
        }
      }
    });

    if (!referral) {
      console.log('❌ Referral not found');
      return NextResponse.json({ 
        error: 'Referral not found' 
      }, { status: 404 });
    }

    if (!referral.isActive) {
      console.log('❌ Referral is not active');
      return NextResponse.json({ 
        error: 'Referral is no longer active' 
      }, { status: 400 });
    }

    // Check if referral is still available
    if (referral.maxUsage && referral.usageCount >= referral.maxUsage) {
      console.log('❌ Referral usage limit reached');
      return NextResponse.json({ 
        error: 'Referral usage limit has been reached' 
      }, { status: 400 });
    }

    // Increment usage count
    const updatedReferral = await prisma.referral.update({
      where: { id: parseInt(referralId) },
      data: {
        usageCount: referral.usageCount + 1
      }
    });

    // Create a usage record to track who used the referral
    const usageRecord = await prisma.referralUsage.create({
      data: {
        referralId: parseInt(referralId),
        userId: parseInt(userId),
        usedAt: new Date()
      }
    });

    // Award points to the provider (referral owner)
    const pointsAwarded = 10; // Base points for referral usage
    await prisma.userPoints.create({
      data: {
        userId: referral.userId,
        points: pointsAwarded,
        source: 'referral_usage',
        description: `Referral ${referral.code} used by another user`,
        referralId: parseInt(referralId)
      }
    });

    console.log('🎉 Referral selected successfully:', {
      referralId,
      providerId: referral.userId,
      pointsAwarded,
      usageRecordId: usageRecord.id
    });

    return NextResponse.json({
      success: true,
      referral: {
        id: referral.id,
        code: referral.code,
        reward: referral.reward,
        description: referral.description,
        category: referral.category,
        maxUsage: referral.maxUsage,
        usageCount: updatedReferral.usageCount,
        isActive: referral.isActive,
        createdAt: referral.createdAt
      },
      provider: {
        id: referral.user.id,
        phoneE164: referral.user.phoneE164,
        walletAddress: referral.user.walletAddress
      },
      pointsAwarded,
      usageRecord: {
        id: usageRecord.id,
        usedAt: usageRecord.usedAt
      }
    });

  } catch (error: any) {
    console.error('Referral selection error:', error);
    return NextResponse.json({ 
      error: 'Failed to select referral' 
    }, { status: 500 });
  }
}
