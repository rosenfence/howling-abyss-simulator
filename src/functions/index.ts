import { Champion } from '@/data/champions';

/**
 * 주어진 챔피언 목록에서 중복 없이 무작위로 n개의 챔피언을 선택합니다.
 * @param champions 전체 챔피언 목록
 * @param count 선택할 챔피언 수
 * @returns 무작위로 선택된 챔피언 배열
 */
export function getRandomChampions(champions: Champion[], count: number): Champion[] {
  // 원본 배열은 변경하지 않기 위해 복사
  const shuffled = [...champions];

  // Fisher-Yates 알고리즘을 사용하여 배열을 무작위로 섞기
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 앞에서부터 count 개수만큼 반환
  return shuffled.slice(0, count);
}
