import Link from 'next/link';
import Image from 'next/image';
import AnswerImg from '@/assets/images/answer.png';
import LunchImg from '@/assets/images/lunch.png';
import BearImg from '@/assets/images/bear.png';
import DailyQuoteImg from '@/assets/images/daily-quote.png';

export default function Home() {
  const menuList = [
    { label: '오늘의 해답', logo: AnswerImg, link: '/page1' },
    { label: '점심 추천', logo: LunchImg, link: '/roulette/lunch' },
    { label: '행운 번호', logo: BearImg, link: '/roulette/number' },
    { label: '하루 명언', logo: DailyQuoteImg, link: '/roulette/quote' },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-auto h-screen">
      <nav>
        <ul className="grid grid-cols-2 gap-9 gap-y-5">
          {menuList.map((menu) => (
            <li key={menu.label}>
              <Link href={menu.link} className="flex flex-col justify-center items-center gap-4">
                <div className="flex justify-center items-center w-32 h-32 rounded-3xl bg-gray">
                  <Image src={menu.logo} width={120} height={120} alt="bear image" />
                </div>
                <span className="text-light-black text-xl font-medium">{menu.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
