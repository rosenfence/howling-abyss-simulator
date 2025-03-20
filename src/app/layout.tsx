import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import './globals.css';
import Header from '@/components/main/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '🔞모두롤자',
  description: '성인행복롤',
  openGraph: {
    images: [
      {
        url: '/fold.jpeg',
        width: 1200,
        height: 630,
        alt: '모두롤자',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/fold.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* 배경 이미지 */}
        <div className='fixed inset-0 z-[-1]'>
          <Image
            src='/fold.jpeg'
            alt='배경 이미지'
            fill
            priority
            className='object-cover'
            style={{ opacity: 0.6 }}
          />
          <div className='absolute inset-0 bg-blue-950/70 mix-blend-multiply' />
        </div>

        {/* 헤더 추가 */}
        <Header />

        {children}
      </body>
    </html>
  );
}
