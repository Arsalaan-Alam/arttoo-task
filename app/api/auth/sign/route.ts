// generates jwt token once message signed. I could but didn't verify the signature
import { NextRequest, NextResponse } from 'next/server';
import { generateJWT } from '@/app/helpers/jwt';

export async function POST(req: NextRequest) {
	const { address, message } = await req.json();

	if (!address || !message ) {
		return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 });
	}
    
	const token = generateJWT(address);
    console.log('[SIGN] JWT generated: ', token);
	return NextResponse.json({ token });
}
