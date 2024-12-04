import Image from 'next/image';
import CrystalBallImg from '@/assets/images/crystal-ball.png';
import Header from 'src/components/header';
import Layout from 'src/components/Layout';
import MessageBox from 'src/components/MessageBox';

export default function Home() {
  return (
    <Layout>
      <Header />
      <Image src={CrystalBallImg} alt="main image" width={200} height={200} />
      <MessageBox />
    </Layout>
  );
}
