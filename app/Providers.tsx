'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/app/contexts/authContext';
import {
	SuiClientProvider,
	WalletProvider,
	createNetworkConfig,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

import '@mysten/dapp-kit/dist/index.css';

const { networkConfig } = createNetworkConfig({
	localnet: { url: getFullnodeUrl('localnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
				<WalletProvider>
					<AuthProvider>
						{children}
					</AuthProvider>
					</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	);
}
