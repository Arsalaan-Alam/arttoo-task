// verify if JWT is valid and not expired

import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/helpers/jwt';

export async function POST(req: NextRequest) {
	const authHeader = req.headers.get('Authorization');

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json({ error: 'Missing token' }, { status: 401 });
	}

	const token = authHeader.split(' ')[1];
	const address = verifyJWT(token);
	console.log('[VERIFY] Address from token:', address);

	if (!address) {
		return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
	}

	return NextResponse.json({ valid: true, address }, {status: 200});

}
