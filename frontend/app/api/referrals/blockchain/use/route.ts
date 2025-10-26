import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    const result = await contractService.useReferralCode(code);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        txHash: result.txHash,
        blockNumber: result.blockNumber
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to use referral code' }, { status: 500 });
  }
}