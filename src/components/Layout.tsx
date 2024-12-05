import { PropsWithChildren } from 'react';
import Image from 'next/image';
import SpringImg from '@/assets/images/sprig.png';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen p-3 bg-background">
      {/* 모서리 이미지 */}
      <Image src={SpringImg} alt="Top Left Corner" width={80} height={80} style={{ position: 'fixed', top: 5, left: 0, transform: 'rotate(180deg)' }} />
      <Image src={SpringImg} alt="Top Right Corner" width={80} height={80} style={{ position: 'fixed', top: 5, right: 0, transform: 'scaleY(-1)' }} />
      <Image src={SpringImg} alt="Bottom Left Corner" width={80} height={80} style={{ position: 'fixed', bottom: 5, left: 0, transform: 'scaleX(-1)' }} />
      <Image src={SpringImg} alt="Bottom Right Corner" width={80} height={80} style={{ position: 'fixed', bottom: 5, right: 0 }} />

      {/* 콘텐츠 */}
      <div className="flex flex-col justify-between items-center w-full h-full p-3">{children}</div>
    </div>
  );
}
