import Image from 'next/image';
import CrystalBallImg from '@/assets/images/crystal-ball.png';
import Header from 'src/components/header';
import Layout from 'src/components/Layout';
import MessageBox from 'src/components/MessageBox';
import LuckScore from 'src/components/LuckScore';

export default function Home() {
  return (
    <Layout>
      <Header />
      <Image src={CrystalBallImg} alt="main image" width={200} height={200} />
      <MessageBox />
      <LuckScore />

      <div className="flex flex-col justify-center items-center gap-3">
        {/* 행운 숫자 보기 */}
        <button className="w-56 h-12 bg-teal rounded-full text-background text-lg font-semibold tracking-widest">행운 숫자 보기</button>
        {/* 다른 사람 공유 */}
        <button className="w-56 h-12 rounded-full border-2 border-solid border-teal text-teal text-lg font-semibold tracking-widest">다른 사람 공유</button>
      </div>
    </Layout>
  );
}
