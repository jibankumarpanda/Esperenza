import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';

export async function GET(request: NextRequest) {
  try {
    const result = await contractService.getContractBalance();

    if (result.success) {
      return NextResponse.json({
        success: true,
        balance: result.balance,
        currency: 'CELO'
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Balance check error:', error);
    return NextResponse.json({ error: 'Failed to get contract balance' }, { status: 500 });
  }
}
