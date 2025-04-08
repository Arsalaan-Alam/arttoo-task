import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Providers } from '@/app/Providers';
import { AuthProvider } from '@/app/contexts/authContext';

export const metadata: Metadata = {
	title: 'Sui Auth App',
	description: 'made for arttoo assignmnent',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
