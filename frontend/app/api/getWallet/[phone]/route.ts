import { NextResponse } from "next/server";
import { contractService } from "@/lib/contractService";

export async function GET(_request: Request, { params }: { params: Promise<{ phone: string }> }) {
  try {
    const { phone } = await params;
    if (!phone) return NextResponse.json({ error: "phone required" }, { status: 400 });

    const result = await contractService.getWalletByPhone(phone);

    if (result.success) {
      return NextResponse.json({ 
        phone, 
        phoneHash: phone, 
        wallet: result.wallet 
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
