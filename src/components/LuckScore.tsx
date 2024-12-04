import Image from 'next/image';
import SunImg from '@/assets/images/sun.png';

export default function LuckScore() {
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <Image src={SunImg} alt="sun image" width={100} height={100} />

      <div className="w-full p-2 rounded-lg border-2 border-solid border-mid-night-blue bg-beige shadow-md">
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-end items-start gap-2 pb-1">
            <p className="text-gray text-xs font-semibold">오늘의 행운 점수는?</p>
            <p className="text-mid-night-blue text-m font-light">무얼 해도 되는 날 이네요!</p>
          </div>

          <div className="flex items-end">
            <span className="text-orange text-6xl font-normal">100</span>
            <span className="text-orange text-xl font-light">점</span>
          </div>
        </div>
      </div>
    </section>
  );
}
