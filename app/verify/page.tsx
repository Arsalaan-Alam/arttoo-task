'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/authContext';

export default function VerifyPage() {
	const { token, logout } = useAuth();
	const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');

	useEffect(() => {
		const verify = async () => {
			if (!token) {
				setStatus('invalid');
				return;
			}
			try {
				const response = await fetch('/api/auth/verify', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.ok) {
					setStatus('valid');
				} else {
					setStatus('invalid');
				}
			} catch {
				setStatus('invalid');
			}
		};

		verify();
	}, [token]);

	return (
		<div className="min-h-screen flex items-center justify-center flex-col gap-4 p-4 text-center">
			<h1 className="text-2xl font-bold">JWT Token Verification</h1>

			{status === 'loading' && <p>Verifying token...</p>}

			{status === 'valid' && (
				<>
					<p className="text-green-600 font-medium">Token is valid</p>
					<div className="bg-gray-100 text-gray-700 text-sm p-3 rounded break-all max-w-xl">
						<strong>JWT:</strong><br />
						{token}
					</div>
				</>
			)}

			{status === 'invalid' && (
				<div className="text-red-600">
					<p>Token is invalid or has expired.</p>
					<button
						onClick={logout}
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
					>
						Disconnect
					</button>
				</div>
			)}
		</div>
	);
}
