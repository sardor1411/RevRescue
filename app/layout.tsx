import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'RevRescue — Turn Reviews Into Revenue',
    template: '%s | RevRescue',
  },
  description:
    'RevRescue helps small and medium businesses get more 5-star reviews, manage reputation, and grow trust automatically on Google, Yelp, and Trustpilot.',
  keywords: ['review management', 'online reputation', 'Google reviews', 'Yelp reviews', 'SMB'],
  openGraph: {
    title: 'RevRescue — Turn Reviews Into Revenue',
    description: 'Automate your review strategy and grow your online reputation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RevRescue — Turn Reviews Into Revenue',
    description: 'Automate your review strategy and grow your online reputation.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
