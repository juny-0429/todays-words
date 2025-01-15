import Link from 'next/link';

export default function Home() {
  const menuList = [
    { label: '오늘의 해답', link: '/page1' },
    { label: '점심 추천', link: '/roulette/lunch' },
    { label: '행운 번호', link: '/page3' },
    { label: '하루 명언', link: '/page4' },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-auto h-screen">
      <nav>
        <ul className="grid grid-cols-2 gap-9 gap-y-5">
          {menuList.map((menu) => (
            <li key={menu.label}>
              <Link href={menu.link} className="flex flex-col justify-center items-center gap-4">
                <div className="w-32 h-32 rounded-3xl bg-gray"></div>
                <span className="text-light-black text-xl font-medium">{menu.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
