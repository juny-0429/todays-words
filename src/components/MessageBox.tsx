import Image from 'next/image';
import CrystalBallImg from '@/assets/images/crystal-ball.png';

export default function MessageBox() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image src={CrystalBallImg} alt="main image" width={200} height={200} />
      <div className="flex flex-col justify-start px-5 py-2.5 border-solid border  rounded-lg border-mid-night-blue bg-beige shadow-md">
        <p>오늘의 한마디</p>
        <time className="text-xs text-gray font-light">2024.12.25</time>
        <p className="text-xm text-mid-night-blue font-normal">오늘은 크리스마스입니다. 사랑하는 사람들과 함께 행복한 하루를 보내요</p>
      </div>
    </div>
  );
}
