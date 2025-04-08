// generate a randomized message after user connects wallet
import { NextRequest, NextResponse } from "next/server";
import { generateMessage } from "@/app/helpers/utils";

export async function POST(req: NextRequest) {
    const { address } = await req.json();

    if (!address) {
        return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    const message = generateMessage(address);
    console.log('[MESSAGE] Message Generated: ', message);
    return NextResponse.json({ message });
}
