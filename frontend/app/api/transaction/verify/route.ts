import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';

export async function POST(request: NextRequest) {
  try {
    const { txHash } = await request.json();

    if (!txHash) {
      return NextResponse.json({ error: 'Transaction hash is required' }, { status: 400 });
    }

    const result = await contractService.verifyTransaction(txHash);

    if (result.success) {
      return NextResponse.json({
        success: true,
        status: result.status,
        blockNumber: result.blockNumber,
        receipt: result.receipt
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Transaction verification error:', error);
    return NextResponse.json({ error: 'Failed to verify transaction' }, { status: 500 });
  }
}
