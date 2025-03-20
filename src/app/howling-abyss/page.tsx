import { Metadata } from 'next';
import { champions } from '@/data/champions';
import ChampionSelector from '@/components/ChampionSelector';

export const metadata: Metadata = {
  title: '🔞모두롤자 :: 칼바람 나락 시뮬레이터',
  description: '무작위 챔피언 선택 시뮬레이터',
};

export default function HowlingAbyssPage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='max-w-4xl w-full flex flex-col items-center gap-8 relative z-10'>
        <h1 className='text-5xl font-bold text-center text-white mb-2'>칼바람 나락 시뮬레이터</h1>
        <p className='text-center text-lg text-blue-100 mb-4'>
          총 {champions.length}개의 챔피언 중 무작위로 10개를 추출합니다. <br />
          당신의 운명의 챔피언은 누구일까요?
        </p>

        <ChampionSelector />
      </div>
    </main>
  );
}
