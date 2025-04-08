import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// create JWT with address as payload
export function generateJWT(address: string): string {
	return jwt.sign({ address }, JWT_SECRET, { expiresIn: '1h' });
}

// decode JWT and verify if valid
export function verifyJWT(token: string): string | null {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { address: string };
		return decoded.address;
	} catch {
		return null;
	}
}
