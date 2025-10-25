import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Use lazy getter to avoid bundler evaluation issues. This runs in Node runtime.
    const prisma = getPrisma();
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
      // Normalize and log the incoming wallet address for debugging
      const wa = walletAddress.trim();
      console.log('Querying user by walletAddress:', wa);

      // Use case-insensitive match to avoid checksum/lowercase mismatches
      user = await prisma.user.findFirst({
        where: { walletAddress: { equals: wa, mode: 'insensitive' } },
        include: {
          transactions: {
            orderBy: { createdAt: 'desc' },
            take: 10 // Get last 10 transactions
          }
        }
      });

      // If user not found, create a new user record for this wallet
      if (!user) {
        console.log('User not found, creating new user for wallet:', wa);
        try {
          // Generate temporary placeholders for required fields
          const tempPhoneE164 = `temp_${Date.now()}@wallet.eco`;
          const tempPhoneHash = `0x${Math.random().toString(16).slice(2, 66).padEnd(64, '0')}`;
          const tempPrivKey = `temp_encrypted_${Date.now()}`;
          
          user = await prisma.user.create({
            data: {
              walletAddress: wa,
              phoneE164: tempPhoneE164,
              phoneHash: tempPhoneHash,
              encryptedPrivKey: tempPrivKey,
              // Mark this as a wallet-only registration (can be updated later)
            },
            include: {
              transactions: {
                orderBy: { createdAt: 'desc' },
                take: 10
              }
            }
          });
          console.log('Created new user with ID:', user.id);
        } catch (createError) {
          console.error('Error creating user:', createError);
          return NextResponse.json({ 
            error: 'Failed to create user record' 
          }, { status: 500 });
        }
      }
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
