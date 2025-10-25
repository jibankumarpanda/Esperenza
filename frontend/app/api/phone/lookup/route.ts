import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Hash the phone number
    const phoneHash = ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));

    // Look up wallet on smart contract
    const result = await contractService.getWalletByPhone(phoneHash);

    if (result.success) {
      return NextResponse.json({
        success: true,
        wallet: result.wallet,
        phoneHash: phoneHash,
        hasWallet: result.wallet !== '0x0000000000000000000000000000000000000000'
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Phone lookup error:', error);
    return NextResponse.json({ error: 'Phone lookup failed' }, { status: 500 });
  }
}