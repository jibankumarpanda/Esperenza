import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('🔗 Referral creation API called');
    const { code, reward, userId, maxUsage } = await request.json();
    console.log('📊 Referral data:', { code, reward, userId, maxUsage });

    if (!code || !userId) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ 
        error: 'Code and user ID are required' 
      }, { status: 400 });
    }

    const prisma = getPrisma();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Check if referral code already exists for this user
    const existingReferral = await prisma.referral.findFirst({
      where: {
        userId: parseInt(userId),
        code: code
      }
    });

    if (existingReferral) {
      console.log('⚠️ Referral code already exists for this user');
      return NextResponse.json({ 
        error: 'Referral code already exists for this user' 
      }, { status: 409 });
    }

    // Create new referral
    console.log('✅ Creating new referral in database...');
    let referral;
    try {
      referral = await prisma.referral.create({
        data: {
          code,
          reward: reward || 'Standard reward',
          maxUsage: maxUsage || null,
          userId: parseInt(userId),
          isActive: true,
          usageCount: 0
        }
      });
    } catch (createError: any) {
      console.error('❌ Failed to create referral:', createError);
      if (createError.message.includes('Unknown field') || createError.message.includes('does not exist')) {
        return NextResponse.json({ 
          error: 'Database schema not updated. Please run: npx prisma db push',
          details: 'The Referral model does not exist in the database yet.'
        }, { status: 500 });
      }
      throw createError;
    }

    console.log('🎉 Referral created successfully:', referral);
    return NextResponse.json({
      success: true,
      referral: {
        id: referral.id,
        code: referral.code,
        reward: referral.reward,
        maxUsage: referral.maxUsage,
        usageCount: referral.usageCount,
        isActive: referral.isActive,
        createdAt: referral.createdAt
      }
    });

  } catch (error: any) {
    console.error('Referral creation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json({ 
      error: `Failed to create referral: ${error.message}`,
      details: error.message
    }, { status: 500 });
  }
}
