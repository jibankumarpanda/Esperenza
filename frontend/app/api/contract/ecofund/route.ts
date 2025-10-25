import { NextRequest, NextResponse } from 'next/server';
import { contractService } from '@/lib/contractService';

export async function GET(request: NextRequest) {
  try {
    const result = await contractService.getEcoFund();

    if (result.success) {
      return NextResponse.json({
        success: true,
        ecoFund: result.ecoFund
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error('EcoFund check error:', error);
    return NextResponse.json({ error: 'Failed to get eco fund address' }, { status: 500 });
  }
}
