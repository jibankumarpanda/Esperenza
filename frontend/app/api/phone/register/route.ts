import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';
import prismaClient from '@/app/lib/prisma';
import { ethers } from 'ethers';

const prisma = prismaClient;
export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, userId } = await request.json();

    if (!phoneNumber || !userId) {
      return NextResponse.json({ error: 'Phone number and user ID are required' }, { status: 400 });
    }

    // Hash the phone number
    const phoneHash = ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));

    // Register phone on smart contract
    const result = await contractService.registerPhone(phoneHash);

    if (result.success) {
      // Update user in database
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { phoneHash: phoneHash }
      });

      return NextResponse.json({
        success: true,
        txHash: result.txHash,
        phoneHash: phoneHash,
        blockNumber: result.blockNumber
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Phone registration error:', error);
    return NextResponse.json({ error: 'Phone registration failed' }, { status: 500 });
  }
}