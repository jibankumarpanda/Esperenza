import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';

export async function POST(request: NextRequest) {
  try {
    const { code, customReward, maxUses } = await request.json();
    
    const result = await contractService.createReferralCode(
      code, 
      customReward || 0, 
      maxUses || 100
    );
    
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
    return NextResponse.json({ error: 'Failed to create referral code' }, { status: 500 });
  }
}