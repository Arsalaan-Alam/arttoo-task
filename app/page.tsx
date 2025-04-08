'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/authContext';
import { useCurrentAccount } from '@mysten/dapp-kit';

export default function Home() {
	const router = useRouter();
	const { isAuthenticated, logout } = useAuth();
	const account = useCurrentAccount();

	return (
		<div className="min-h-screen flex items-center justify-center flex-col gap-6 p-6">
			<h1 className="text-3xl font-bold text-blue-800">Sui Auth App</h1>

			<div className="text-sm text-gray-700 text-center">
				{account?.address ? (
					<p>
						Wallet Connected: <br />
						<span className="font-mono">{account.address}</span>
					</p>
				) : (
					<p>Wallet not connected</p>
				)}
			</div>

			<div className="flex flex-wrap gap-4 mt-4">
				<button
					onClick={() => router.push('/connect')}
					disabled={isAuthenticated}
					className={`px-6 py-2 rounded-md font-medium transition border-2 ${
						isAuthenticated
							? 'border-blue-200 text-blue-200 cursor-not-allowed'
							: 'border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer'
					}`}
				>
					{account?.address ? 'Connected' : 'Connect Wallet'}
				</button>

				<button
					onClick={() => router.push('/verify')}
					disabled={!isAuthenticated}
					className={`px-6 py-2 rounded-md font-medium text-white transition ${
						!isAuthenticated
							? 'bg-blue-200 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
					}`}
				>
					Verify JWT
				</button>

				<button
					onClick={logout}
					disabled={!isAuthenticated}
					className={`px-6 py-2 rounded-md font-medium text-white transition ${
						!isAuthenticated
							? 'bg-slate-300 cursor-not-allowed'
							: 'bg-slate-500 hover:bg-slate-600 cursor-pointer'
					}`}
				>
					Disconnect
				</button>
			</div>
		</div>
	);
}
