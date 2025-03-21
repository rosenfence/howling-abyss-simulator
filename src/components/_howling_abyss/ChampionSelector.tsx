'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { champions } from '@/data/champions';
import { getRandomChampions } from '@/functions';

export default function ChampionSelector() {
  const [selectedChampions, setSelectedChampions] = useState<typeof champions>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleReset = () => {
    setSelectedChampions([]);
    setClickCount(0);
  };

  const handleGenerateChampions = () => {
    setIsLoading(true);
    const randomChampions = getRandomChampions(champions, 10);
    setSelectedChampions(randomChampions);
    setClickCount(0);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleCardClick = (index: number) => {
    let newChampion: (typeof champions)[0];
    do {
      newChampion = getRandomChampions(champions, 1)[0];
    } while (selectedChampions.some((champ) => champ.id === newChampion.id));

    setSelectedChampions((prev) => {
      const updated = [...prev];
      updated[index] = newChampion;
      return updated;
    });
    setClickCount((prev) => prev + 1);
  };

  return (
    <>
      {selectedChampions.length === 0 && (
        <>
          <h1 className='text-5xl font-bold text-center text-white mb-2'>칼바람 나락 시뮬레이터</h1>
          <p className='text-center text-lg text-blue-100 mb-4'>
            총 {champions.length}개의 챔피언 중 무작위로 10개를 추출합니다. <br />
            당신의 운명의 챔피언은 누구일까요?
          </p>
        </>
      )}
      {selectedChampions.length > 0 && (
        <div className='mt-8 flex flex-col gap-8 w-full'>
          <div>
            <h2 className='text-2xl font-bold text-center text-white mb-4'>1팀</h2>
            <div className='grid grid-cols-5 gap-4'>
              {selectedChampions.slice(0, 5).map((champion, index) => (
                <Card
                  key={champion.id}
                  className='overflow-hidden h-full flex flex-col border-2 border-blue-300 bg-white/90 cursor-pointer'
                  onClick={() => handleCardClick(index)}
                >
                  <div className='relative pt-[80%]'>
                    <Image
                      src={champion.image}
                      alt={champion.name}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='object-cover'
                      priority={false}
                    />
                    <div className='hidden md:block absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-sm p-1'>
                      {champion.name}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className='text-center text-lg text-blue-100 mb-4'>주사위 굴린 횟수 : {clickCount}</div>
      <div className='flex gap-4'>
        <Button
          onClick={handleGenerateChampions}
          size='lg'
          className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl rounded-full shadow-lg cursor-pointer'
        >
          {selectedChampions.length === 0 ? '무작위 챔피언 10개 선택하기' : '다시 선택하기'}
        </Button>

        <Button
          onClick={handleReset}
          size='lg'
          className='bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl rounded-full shadow-lg cursor-pointer'
        >
          처음으로
        </Button>
      </div>

      {selectedChampions.length > 0 && (
        <div className='mt-8 flex flex-col gap-8 w-full'>
          <div>
            <h2 className='text-2xl font-bold text-center text-white mb-4'>2팀</h2>
            <div className='grid grid-cols-5 gap-4'>
              {selectedChampions.slice(5, 10).map((champion, index) => (
                <Card
                  key={champion.id}
                  className='overflow-hidden h-full flex flex-col border-2 border-blue-300 bg-white/90 cursor-pointer'
                  onClick={() => handleCardClick(index + 5)}
                >
                  <div className='relative pt-[80%]'>
                    <Image
                      src={champion.image}
                      alt={champion.name}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='object-cover'
                      priority={false}
                    />
                    <div className='hidden md:block absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-sm p-1'>
                      {champion.name}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className='fixed inset-0 bg-white flex items-center justify-center z-50'>
          <div className='loader'></div>
        </div>
      )}
    </>
  );
}
