import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';

export async function POST(request: NextRequest) {
  try {
    const result = await contractService.claimReferralRewards();
    
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
    return NextResponse.json({ error: 'Failed to claim rewards' }, { status: 500 });
  }
}