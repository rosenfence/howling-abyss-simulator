'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { champions } from '@/data/champions';
import { getRandomChampions } from '@/functions';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/Modal';

export default function ChampionSelector() {
  const [selectedChampions, setSelectedChampions] = useState<typeof champions>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [team1ClickCount, setTeam1ClickCount] = useState(0);
  const [team2ClickCount, setTeam2ClickCount] = useState(0);
  const [waitingList1, setWaitingList1] = useState<Set<string>>(new Set());
  const [waitingList2, setWaitingList2] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    items: string[];
    onSelect: (item: string) => void;
  } | null>(null);
  const [maxDice1, setMaxDice1] = useState<string | number>('unlimited');
  const [maxDice2, setMaxDice2] = useState<string | number>('unlimited');
  const [isUnlimited1, setIsUnlimited1] = useState(true);
  const [isUnlimited2, setIsUnlimited2] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleReset = () => {
    setSelectedChampions([]);
    setTeam1ClickCount(0);
    setTeam2ClickCount(0);
    setWaitingList1(new Set());
    setWaitingList2(new Set());
  };

  const handleGenerateChampions = () => {
    setIsLoading(true);
    const randomChampions = getRandomChampions(champions, 10);
    setSelectedChampions(randomChampions);
    setTeam1ClickCount(0);
    setTeam2ClickCount(0);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleCardClick = (index: number, team: number) => {
    if (selectedChampions.length + waitingList1.size + waitingList2.size >= champions.length) {
      setIsModalOpen(true);
      return;
    }

    const remainingDice =
      team === 1
        ? getRemainingDice(maxDice1, team1ClickCount, isUnlimited1)
        : getRemainingDice(maxDice2, team2ClickCount, isUnlimited2);
    if (remainingDice === 0) return;

    let newChampion: (typeof champions)[0];
    do {
      newChampion = getRandomChampions(champions, 1)[0];
    } while (
      selectedChampions.some((champ) => champ.id === newChampion.id) ||
      waitingList1.has(newChampion.name) ||
      waitingList2.has(newChampion.name)
    );

    setSelectedChampions((prev) => {
      const updated = [...prev];
      const removedChampion = updated[index];
      updated[index] = newChampion;
      if (team === 1) {
        setWaitingList1((prevList) => new Set(prevList).add(removedChampion.name));
      } else if (team === 2) {
        setWaitingList2((prevList) => new Set(prevList).add(removedChampion.name));
      }
      return updated;
    });

    if (team === 1) {
      setTeam1ClickCount((prev) => prev + 1);
    } else if (team === 2) {
      setTeam2ClickCount((prev) => prev + 1);
    }
  };

  const handleCardRightClick = (event: React.MouseEvent, index: number, team: number) => {
    event.preventDefault();
    const waitingList = team === 1 ? Array.from(waitingList1) : Array.from(waitingList2);

    showContextMenu(event, waitingList, (selectedFromWaitingList) => {
      setSelectedChampions((prev) => {
        const updated = [...prev];
        const removedChampion = updated[index];
        updated[index] = champions.find((champ) => champ.name === selectedFromWaitingList)!;

        if (team === 1) {
          setWaitingList1((prevList) => {
            const newList = new Set(prevList);
            newList.delete(selectedFromWaitingList);
            newList.add(removedChampion.name);
            return newList;
          });
        } else if (team === 2) {
          setWaitingList2((prevList) => {
            const newList = new Set(prevList);
            newList.delete(selectedFromWaitingList);
            newList.add(removedChampion.name);
            return newList;
          });
        }
        return updated;
      });
    });
  };

  const showContextMenu = (
    event: React.MouseEvent,
    items: string[],
    onSelect: (item: string) => void
  ) => {
    event.preventDefault();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuWidth = 150;
    const menuHeight = Math.min(items.length, 10) * 40;

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth;
    }
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight;
    }

    setContextMenu({
      visible: true,
      x,
      y,
      items,
      onSelect,
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleMaxDiceChange = (
    value: string,
    setMaxDice: React.Dispatch<React.SetStateAction<string | number>>
  ) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setMaxDice(parsedValue);
    } else if (value === '') {
      setMaxDice('');
    }
  };

  const getRemainingDice = (maxDice: string | number, clickCount: number, isUnlimited: boolean) => {
    if (isUnlimited) return '제한 없음';
    if (typeof maxDice === 'number') return Math.max(0, maxDice - clickCount);
    return maxDice;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleHelpModalOpen = () => {
    setIsHelpModalOpen(true);
  };

  const handleHelpModalClose = () => {
    setIsHelpModalOpen(false);
  };

  return (
    <div className='w-full h-full' onContextMenu={(e) => e.preventDefault()}>
      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <div className='flex flex-col gap-4 mb-4'>
          <h2 className='text-xl font-bold'>알림</h2>
          <p>더 이상 선택할 수 있는 챔피언이 없습니다.</p>
        </div>
      </Modal>
      <Modal isOpen={isHelpModalOpen} onRequestClose={handleHelpModalClose}>
        <div className='flex flex-col gap-4 mb-4 min-w-[500px]'>
          <h2 className='text-xl font-bold'>도움말</h2>
          <p>1. 챔피언 카드를 클릭하면 주사위를 소모하여 새로운 챔피언을 선택할 수 있습니다.</p>
          <p>2. 챔피언 카드를 우클릭하면 대기 리스트에 있는 챔피언과 교체할 수 있습니다.</p>
          <p>3. 주사위 갯수는 챔피언 픽 이전에 설정할 수 있습니다.</p>
        </div>
      </Modal>
      {selectedChampions.length === 0 && (
        <>
          <h1
            className={`text-5xl font-bold text-center text-white mb-2 ${
              selectedChampions.length === 0 ? 'mt-20' : ''
            }`}
          >
            칼바람 나락 시뮬레이터
          </h1>
          <p className='text-center text-lg text-blue-100 mb-4'>
            총 {champions.length}개의 챔피언 중 무작위로 10개를 추출합니다. <br />
            당신의 운명의 챔피언은 누구일까요?
          </p>
          <div className='flex flex-col items-center gap-4 mb-4'>
            <div className='flex items-center gap-2'>
              <label htmlFor='maxDice1' className='text-white'>
                1팀 주사위 갯수:
              </label>
              <Input
                id='maxDice1'
                type='number'
                value={isUnlimited1 ? '' : maxDice1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMaxDiceChange(e.target.value, setMaxDice1)
                }
                className='w-20 p-1 text-center bg-white text-black'
                placeholder='0'
                disabled={isUnlimited1}
              />
              <label className='text-white'>
                <input
                  type='checkbox'
                  checked={isUnlimited1}
                  onChange={() => setIsUnlimited1(!isUnlimited1)}
                />
                제한 없음
              </label>
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor='maxDice2' className='text-white'>
                2팀 주사위 갯수:
              </label>
              <Input
                id='maxDice2'
                type='number'
                value={isUnlimited2 ? '' : maxDice2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMaxDiceChange(e.target.value, setMaxDice2)
                }
                className='w-20 p-1 text-center bg-white text-black'
                placeholder='0'
                disabled={isUnlimited2}
              />
              <label className='text-white'>
                <input
                  type='checkbox'
                  checked={isUnlimited2}
                  onChange={() => setIsUnlimited2(!isUnlimited2)}
                />
                제한 없음
              </label>
            </div>
          </div>
        </>
      )}
      <div
        className={`flex w-full ${
          selectedChampions.length === 0 ? 'justify-center' : 'justify-end'
        } gap-4`}
      >
        <Button
          onClick={handleGenerateChampions}
          size='lg'
          className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl rounded-full shadow-lg cursor-pointer'
        >
          {selectedChampions.length === 0 ? '무작위 챔피언 픽' : '다시 선택하기'}
        </Button>

        {selectedChampions.length > 0 && (
          <>
            <Button
              onClick={handleReset}
              size='lg'
              className='bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-xl rounded-full shadow-lg cursor-pointer'
            >
              처음으로
            </Button>
          </>
        )}

        <Button
          onClick={handleHelpModalOpen}
          size='lg'
          className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-xl rounded-full shadow-lg cursor-pointer'
        >
          도움말
        </Button>
      </div>

      {selectedChampions.length > 0 && (
        <div className='flex flex-col gap-8 w-full mt-4'>
          <div>
            <h2 className='text-2xl font-bold text-center text-white mb-4'>1팀</h2>
            <div className='text-center text-lg text-blue-100 mb-4'>
              1팀 챔피언 대기 리스트: {Array.from(waitingList1).join(', ')}
            </div>
            <div className='grid grid-cols-5 gap-4'>
              {selectedChampions.slice(0, 5).map((champion, index) => (
                <Card
                  key={champion.id}
                  className='overflow-hidden h-full flex flex-col border-2 border-blue-300 bg-white/90 cursor-pointer'
                  onClick={() => handleCardClick(index, 1)}
                  onContextMenu={(event) => handleCardRightClick(event, index, 1)}
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

      {selectedChampions.length > 0 && (
        <div className='text-center text-lg text-blue-100 my-4'>
          1팀 남은 주사위 갯수 : {getRemainingDice(maxDice1, team1ClickCount, isUnlimited1)}
        </div>
      )}

      {selectedChampions.length > 0 && (
        <div className='flex flex-col gap-8 w-full'>
          <div>
            <h2 className='text-2xl font-bold text-center text-white mb-4'>2팀</h2>
            <div className='text-center text-lg text-blue-100 mb-4'>
              2팀 챔피언 대기 리스트: {Array.from(waitingList2).join(', ')}
            </div>
            <div className='grid grid-cols-5 gap-4'>
              {selectedChampions.slice(5, 10).map((champion, index) => (
                <Card
                  key={champion.id}
                  className='overflow-hidden h-full flex flex-col border-2 border-blue-300 bg-white/90 cursor-pointer'
                  onClick={() => handleCardClick(index + 5, 2)}
                  onContextMenu={(event) => handleCardRightClick(event, index + 5, 2)}
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

      {selectedChampions.length > 0 && (
        <div className='text-center text-lg text-blue-100 mt-4'>
          2팀 남은 주사위 갯수 : {getRemainingDice(maxDice2, team2ClickCount, isUnlimited2)}
        </div>
      )}

      {isLoading && (
        <div className='fixed inset-0 bg-white flex items-center justify-center z-50'>
          <div className='loader'></div>
        </div>
      )}

      {contextMenu && contextMenu.visible && (
        <>
          <div className='fixed inset-0 z-40' onClick={handleContextMenuClose} />
          <div
            className='fixed z-50 bg-white border border-gray-300 shadow-lg overflow-y-auto'
            style={{ top: contextMenu.y, left: contextMenu.x, maxHeight: '400px' }}
          >
            {contextMenu.items.map((item) => (
              <div
                key={item}
                className='p-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => {
                  contextMenu.onSelect(item);
                  handleContextMenuClose();
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
