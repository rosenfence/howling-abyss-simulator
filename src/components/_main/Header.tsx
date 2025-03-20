import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='w-full bg-black/30 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* 왼쪽 섹션: 로고/홈 버튼과 네비게이션 링크 */}
          <div className='flex items-center space-x-4'>
            {/* 로고/홈 버튼 */}
            <div className='flex-shrink-0'>
              <Link href='/' className='flex items-center'>
                <span className='text-white font-bold text-xl hover:text-blue-300 transition-colors'>
                  🔞모두롤자
                </span>
              </Link>
            </div>
            {/* 네비게이션 링크 */}
            <nav className='flex space-x-4 ml-6'>
              <Link
                href='/howling-abyss'
                className='px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 hover:text-white transition-colors'
              >
                칼바람 나락
              </Link>
              {/* 추후 다른 링크들을 여기에 추가할 수 있습니다 */}
            </nav>
          </div>
          {/* 오른쪽 섹션: GitHub 링크 */}
          <div>
            <a
              href='https://github.com/rosenfence/howling-abyss-simulator'
              target='blank'
              rel='noopener noreferrer'
              className='text-white hover:text-blue-300 transition-colors'
              aria-label='GitHub 저장소'
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
