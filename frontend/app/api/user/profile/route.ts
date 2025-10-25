import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Ensure Prisma is connected (helps surface connection errors early)
    try {
      await prisma.$connect();
    } catch (connErr) {
      console.error('Prisma connection error:', connErr);
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');
    const phoneNumber = searchParams.get('phoneNumber');

    if (!walletAddress && !phoneNumber) {
      return NextResponse.json({ 
        error: 'Wallet address or phone number is required' 
      }, { status: 400 });
    }

    let user;
    
    if (walletAddress) {
      // Use findFirst for walletAddress since it might not be unique yet
      user = await prisma.user.findFirst({
        where: { walletAddress },
        include: {
          transactions: {
            orderBy: { createdAt: 'desc' },
            take: 10 // Get last 10 transactions
          }
        }
      });
    } else if (phoneNumber) {
      // Use findUnique for phoneE164 since it's unique
      user = await prisma.user.findUnique({
        where: { phoneE164: phoneNumber },
        include: {
          transactions: {
            orderBy: { createdAt: 'desc' },
            take: 10 // Get last 10 transactions
          }
        }
      });
    }

    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phoneE164: user.phoneE164,
        phoneHash: user.phoneHash,
        walletAddress: user.walletAddress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        transactions: user.transactions
      }
    });

  } catch (error: any) {
    console.error('Get user profile error:', error);
    return NextResponse.json({ 
      error: 'Failed to get user profile' 
    }, { status: 500 });
  }
}
