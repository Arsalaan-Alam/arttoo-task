'use client';

import { useEffect, useState } from 'react';
import { ConnectButton, useCurrentAccount, useSignTransaction, useSignPersonalMessage } from '@mysten/dapp-kit';
import { useAuth } from '@/app/contexts/authContext';
import { useRouter } from 'next/navigation';

export default function Page() {
    const account = useCurrentAccount();
    const { setToken } = useAuth();
    const [message, setMessage] = useState('');
	const [status, setStatus] = useState('');
	const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();
    const router = useRouter();

    useEffect(() => {
		if (account?.address) {
			fetchMessage();
		}
	}, [account]);

    const fetchMessage = async () => {
        const response = await fetch('/api/auth/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ address: account?.address }),
        });
        const data = await response.json();
        if (response.ok) {
            setMessage(data.message);
        } else {
            console.error('Error fetching message:', data.error);
        }
    }

    const handleSign = async () => {
        if (!account?.address || !message) return;
        try {
            const signature = await signPersonalMessage({
                message: new TextEncoder().encode(message),
        });

        const response = await fetch('/api/auth/sign',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                address: account?.address,
                message,
               // signature,
        })
    });
        const data = await response.json();
        if (response.ok) {
            setToken(data.token);
            setStatus('Authentication successful!');
            router.push('/');
        } else {
            console.error('Error verifying signature:', data.error);
            setStatus('Authentication failed.');
        }
    }
        catch (error) {
            console.error('Error signing message:', error);
            setStatus('Signing failed.');
        }
    };
    
    return (
		<div className="min-h-screen flex items-center justify-center flex-col gap-4 p-4">
			<ConnectButton />

			{account?.address && (
				<>
					<p className="text-gray-700 text-sm">
						Connected: {account.address}
					</p>

					{message && (
						<p className="text-xs text-gray-500 break-words text-center">
							Message to sign: <br /> {message}
						</p>
					)}

					<button
						onClick={handleSign}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Sign Message
					</button>
				</>
			)}

			{status && (
				<p className="mt-2 text-sm text-center">
					{status}
				</p>
			)}
		</div>
	);
}
