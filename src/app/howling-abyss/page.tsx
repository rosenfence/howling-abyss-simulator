import { Metadata } from 'next';
import ChampionSelector from '@/components/_howling_abyss/ChampionSelector';

export const metadata: Metadata = {
  title: '🔞모두롤자 :: 칼바람 나락 시뮬레이터',
  description: '무작위 챔피언 선택 시뮬레이터',
};

export default function HowlingAbyssPage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='max-w-4xl w-full flex flex-col items-center gap-8 relative z-10'>
        <ChampionSelector />
      </div>
    </main>
  );
}
