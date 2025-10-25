import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';
import prisma from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { receiver, amount, userId } = await request.json();

    // Send payment via smart contract
    const result = await contractService.sendPayment(receiver, amount);

    if (result.success) {
      // Store transaction in database
      await prisma.transaction.create({
        data: {
          txHash: result.txHash,
          fromAddress: process.env.DEPLOYER_ADDRESS || '',
          toAddress: receiver,
          amount: amount,
          donation: (parseFloat(amount) * 0.01).toString(), // 1% donation
          userId: parseInt(userId),
          blockNumber: BigInt(result.blockNumber || 0),
          status: 'success'
        }
      });

      return NextResponse.json({
        success: true,
        txHash: result.txHash,
        blockNumber: result.blockNumber
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}