import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google';
import Header from './components/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Faceit account finder',
	description:
		'Find your FaceIt account by Steam profile link. Check FaceIt ELO and stats for CS2.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-fct-body h-full">
				<Header />
				{children}
				<GoogleAnalytics gaId="G-P4XZ2HDDSK" />
			</body>
		</html>
	);
}
