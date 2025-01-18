import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from 'src/lib/supabaseClient';
import { jalnan2 } from 'src/theme/fonts';

interface MenuItem {
  id: number;
  name: string;
}

interface Props {
  initialMenu: MenuItem[];
}

export default function Lunch({ initialMenu }: Props) {
  const router = useRouter();
  const [randomMenu, setRandomMenu] = useState('');
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태

  const handleRoulette = () => {
    if (initialMenu.length === 0) return alert('메뉴가 없습니다!');

    setIsAnimating(true);
    const totalDuration = 3000;
    const interval = 100;

    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * initialMenu.length);
      setRandomMenu(initialMenu[randomIndex].name);
    }, interval);

    setTimeout(() => {
      clearInterval(timer);

      const finalIndex = Math.floor(Math.random() * initialMenu.length);
      setRandomMenu(initialMenu[finalIndex].name);
      setIsAnimating(false);
    }, totalDuration);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-16 w-auto h-screen">
      <h1 className={`text-3xl text-mid-night-blue ${jalnan2.className}`}>
        점심 메뉴
        <br />
        랜덤 뽑기
      </h1>

      {/* 랜덤 메뉴 출력 */}
      <div className="flex justify-center items-center w-72 h-56 rounded-xl bg-beige">
        <span className="text-5xl text-mid-night-blue font-extralight tracking-widest">{randomMenu || '뭐먹지?'}</span>
      </div>

      {/* 버튼 동작 */}
      <div className="flex flex-col items-center gap-5">
        <button className="w-64 h-14 rounded-2xl bg-orange text-white text-2xl font-medium" onClick={handleRoulette} disabled={isAnimating}>
          룰렛 돌리기
        </button>
        <button className="w-64 h-14 rounded-2xl outline outline-2 outline-deep-gray text-deep-gray text-2xl font-medium" onClick={() => router.back()}>
          뒤로 가기
        </button>
      </div>
    </main>
  );
}

// 서버사이드 데이터 가져오기
export async function getServerSideProps() {
  const { data, error } = await supabase.from('lunch_menu').select('*');
  if (error) {
    console.error('데이터 가져오기 실패:', error);
    return { props: { initialMenu: [] } };
  }
  return { props: { initialMenu: data || [] } };
}
