import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 User registration API called');
    const { phoneNumber, walletAddress } = await request.json();
    console.log('📱 Registration data:', { phoneNumber, walletAddress });

    if (!phoneNumber || !walletAddress) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ 
        error: 'Phone number and wallet address are required' 
      }, { status: 400 });
    }

    // Hash the phone number
    const phoneHash = ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));

    // Check if user already exists
    console.log('🔍 Checking for existing user...');
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { phoneE164: phoneNumber },
          { phoneHash: phoneHash },
          { walletAddress: walletAddress }
        ]
      }
    });

    if (existingUser) {
      console.log('⚠️ User already exists:', existingUser);
      return NextResponse.json({ 
        error: 'User already exists with this phone number or wallet address' 
      }, { status: 409 });
    }

    // Create new user in database
    console.log('✅ Creating new user in database...');
    const user = await prisma.user.create({
      data: {
        phoneE164: phoneNumber,
        phoneHash: phoneHash,
        walletAddress: walletAddress,
        encryptedPrivKey: '', // Will be set later when user generates keys
        pepper: '', // Will be set later
        dekPublicKey: '', // Will be set later
        dekEncrypted: '' // Will be set later
      }
    });

    console.log('🎉 User created successfully:', user);
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phoneE164: user.phoneE164,
        phoneHash: user.phoneHash,
        walletAddress: user.walletAddress,
        createdAt: user.createdAt
      }
    });

  } catch (error: any) {
    console.error('User registration error:', error);
    return NextResponse.json({ 
      error: 'Failed to register user' 
    }, { status: 500 });
  }
}
