import { v4 as uuidv4 } from 'uuid';

// generate message with random uuid
export function generateMessage(address: string): string {
	return `Sign this randomized message: ${uuidv4()}-${address}`;
}
