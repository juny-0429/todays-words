import Image from 'next/image';
import SunImg from '@/assets/images/sun.png';

export default function LuckScore() {
  return (
    <section className="flex justify-between items-center gap-4 w-full">
      <div className="flex flex-col justify-end items-start gap-2 h-full pb-1">
        <p className="text-gray text-xs font-semibold">오늘의 행운 점수는?</p>
        <p className="text-mid-night-blue text-m font-light">무얼 해도 되는 날 이네요!</p>
      </div>

      <div className="relative w-[110px] h-[110px]">
        <Image src={SunImg} alt="sun image" layout="fill" objectFit="cover" />
        <div className="absolute bottom-1 inset-0 flex items-center justify-center">
          <span className="text-mid-night-blue text-4xl font-bold">100</span>
        </div>
      </div>
    </section>
  );
}
