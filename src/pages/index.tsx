import Image from 'next/image';
import Header from 'src/features/header';
import Layout from 'src/features/Layout';
import CrystalBallImg from '@/assets/images/crystal-ball.png';

export default function Home() {
  return (
    <Layout>
      <Header />
      <Image src={CrystalBallImg} alt="main image" width={200} height={200} />
    </Layout>
  );
}
