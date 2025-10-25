import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';
import prismaClient from '@/app/lib/prisma';
import { ethers } from 'ethers';

const prisma = prismaClient;
export async function POST(request: NextRequest) {
  try {
    console.log('📞 Phone registration API called');
    const { phoneNumber, userId } = await request.json();
    console.log('📱 Phone registration data:', { phoneNumber, userId });

    if (!phoneNumber || !userId) {
      console.log('❌ Missing phone number or user ID');
      return NextResponse.json({ error: 'Phone number and user ID are required' }, { status: 400 });
    }

    // Hash the phone number
    const phoneHash = ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));

    // Register phone on smart contract
    console.log('🔗 Registering phone on blockchain...');
    const result = await contractService.registerPhone(phoneHash);
    console.log('📊 Blockchain registration result:', result);

    if (result.success) {
      console.log('✅ Blockchain registration successful, updating user in database...');
      // Update user in database
      try {
        await prisma.user.update({
          where: { id: parseInt(userId) },
          data: { phoneHash: phoneHash }
        });
        console.log('✅ User updated in database');
      } catch (dbError) {
        console.log('⚠️ User not found in database, but blockchain registration succeeded');
      }

      return NextResponse.json({
        success: true,
        txHash: result.txHash,
        phoneHash: phoneHash,
        blockNumber: result.blockNumber
      });
    } else {
      console.log('❌ Blockchain registration failed:', result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Phone registration error:', error);
    return NextResponse.json({ error: 'Phone registration failed' }, { status: 500 });
  }
}