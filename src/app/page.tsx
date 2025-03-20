import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '🔞모두롤자',
  description: '모두롤자 홈페이지',
  openGraph: {
    images: [
      {
        url: '/fold.jpeg',
        width: 1200,
        height: 630,
        alt: '모두롤자 홈페이지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/fold.jpeg'],
  },
};

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='max-w-4xl w-full flex flex-col items-center gap-8'>
        <h1 className='text-5xl font-bold text-center text-white mb-2'>🔞모두롤자</h1>
        <p className='text-center text-lg text-blue-100 mb-4'>모두롤자에 오신 것을 환영합니다.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl'>
          <Link href='/howling-abyss' className='w-full'>
            <Button
              className='w-full h-32 text-xl bg-blue-600 hover:bg-blue-700 shadow-lg transition-transform hover:scale-105 cursor-pointer text-white'
              variant='default'
            >
              칼바람 나락 시뮬레이터
            </Button>
          </Link>
          {/* 추후 다른 도구들도 여기에 추가할 수 있습니다 */}
        </div>
      </div>
    </main>
  );
}
