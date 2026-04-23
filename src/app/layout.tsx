import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TransitionProvider from '@/Layout/TransitionProvider';
import Navbar from '@/Layout/Navbar';
import Footer from '@/Layout/Footer';
import BottomMenu from '@/Layout/BottomMenu/BottomMenu';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Choroby Mózgu - Rzetelna wiedza o neurologii',
    template: '%s | Choroby Mózgu',
  },
  description:
    'Blog medyczny o chorobach mózgu — rzetelne informacje o neurologii, zdrowiu psychicznym i nowoczesnych metodach leczenia.',
  keywords: [
    'choroby mózgu',
    'neurologia',
    'zdrowie psychiczne',
    'mózg',
    'leczenie',
    'artykuły medyczne',
  ],
  authors: [{ name: 'Zespół ChorobyMózgu.pl' }],
  metadataBase: new URL('https://chorobymozgu.pl'),
  openGraph: {
    title: 'Choroby Mózgu - Wiedza o neurologii i zdrowiu psychicznym',
    description:
      'Dowiedz się więcej o chorobach mózgu, ich przyczynach, leczeniu i profilaktyce. Artykuły pisane przez specjalistów.',
    url: 'https://chorobymozgu.pl',
    siteName: 'Choroby Mózgu',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/img/avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Choroby Mózgu - Blog medyczny o neurologii',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[var(--color-surface)]`}>
        <Navbar />
        <main className="pt-[100px] pb-16 lg:pb-0">
          <TransitionProvider>{children}</TransitionProvider>
        </main>
        <Footer />
        <BottomMenu />
      </body>
    </html>
  );
}