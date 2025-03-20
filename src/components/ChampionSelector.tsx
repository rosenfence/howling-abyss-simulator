'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { champions } from '@/data/champions';
import { getRandomChampions } from '@/functions';

export default function ChampionSelector() {
  const [selectedChampions, setSelectedChampions] = useState<typeof champions>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateChampions = () => {
    const randomChampions = getRandomChampions(champions, 10);
    setSelectedChampions(randomChampions);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleGenerateChampions}
        size='lg'
        className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl rounded-full shadow-lg cursor-pointer'
      >
        무작위 챔피언 10개 선택하기
      </Button>

      {selectedChampions.length > 0 && (
        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
          {selectedChampions.map((champion) => (
            <Card
              key={champion.id}
              className='overflow-hidden h-full flex flex-col border-2 border-blue-300 bg-white/90'
            >
              <div className='relative pt-[100%]'>
                <Image
                  src={champion.image}
                  alt={champion.name}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover'
                  priority={false}
                />
              </div>
              <CardHeader className='p-3'>
                <CardTitle className='text-center text-lg'>{champion.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-4xl w-full'>
          <DialogHeader>
            <DialogTitle className='text-2xl text-center mb-4'>선택된 챔피언</DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {selectedChampions.map((champion) => (
              <div key={champion.id} className='flex flex-col items-center'>
                <div className='relative w-full pt-[100%] rounded-md overflow-hidden'>
                  <Image
                    src={champion.image}
                    alt={champion.name}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw'
                    className='object-cover'
                  />
                </div>
                <p className='mt-2 text-center font-medium'>{champion.name}</p>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-4 cursor-pointer'>
            <Button onClick={() => setIsDialogOpen(false)}>닫기</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
