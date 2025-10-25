import { NextResponse } from "next/server";
import { contractService } from "@/lib/contractService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = body?.phone;
    if (!phone) return NextResponse.json({ error: "phone required in body" }, { status: 400 });

    const result = await contractService.registerPhone(phone);

    if (result.success) {
      return NextResponse.json({ 
        phone, 
        phoneHash: phone, 
        txHash: result.txHash, 
        receipt: result.receipt 
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
