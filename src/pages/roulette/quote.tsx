import { useState } from 'react';
import Image from 'next/image';
import TreeImg from '@/assets/images/tree.png';
import { supabase } from 'src/lib/supabaseClient';
import { useRouter } from 'next/router';

interface DailyQuoteItem {
  id: number;
  quote_ko: string;
  quote_en: string;
  movie: string;
}

interface Props {
  initialQuote: DailyQuoteItem | null;
  quoteList: DailyQuoteItem[];
}

export default function Quote({ initialQuote, quoteList }: Props) {
  const router = useRouter();
  const [currentQuote, setCurrentQuote] = useState<DailyQuoteItem | null>(initialQuote);
  const [fadeKey, setFadeKey] = useState(0);

  const handleNewQuote = () => {
    if (quoteList.length > 0) {
      let randomQuote;
      do {
        randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
      } while (randomQuote.id === currentQuote?.id);
      setCurrentQuote(randomQuote);

      setFadeKey((prev) => prev + 1);
    }
  };

  return (
    <main className="flex flex-col items-center gap-5 notebook-background h-screen py-4">
      <h1 className="text-4xl font-bold text-center mb-4">DAILY QUOTE</h1>

      <div className="flex justify-center items-center w-48 h-48 rounded-full bg-gradient-to-b from-gradient-1 to-gradient-2 border-4 border-white">
        <Image src={TreeImg} width={180} height={180} alt="tree image" />
      </div>

      {currentQuote ? (
        <div key={fadeKey} className="flex flex-col gap-1 w-full h-64 px-4 py-8 bg-white rounded-md">
          <p className="text-lg text-mid-night-blue font-medium animate-fadeIn">{currentQuote.quote_en}</p>
          <p className="text-base font-light animate-fadeIn">{currentQuote.quote_ko}</p>
          <p className="pt-6 text-xs text-light-brown font-normal tracking-wider animate-fadeIn">{currentQuote.movie}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">데이터가 없습니다.</p>
      )}

      <div className="flex justify-center gap-5">
        <button onClick={handleNewQuote} className="w-40 h-11 bg-light-green rounded-full text-lg text-white font-bold tracking-widest drop-shadow-md">
          다른 명언 뽑기
        </button>
        <button className="w-40 h-11 bg-beige rounded-full text-lg text-light-black font-bold tracking-widest drop-shadow-md" onClick={router.back}>
          뒤로 가기
        </button>
      </div>
    </main>
  );
}

// 서버사이드 데이터 가져오기
export async function getServerSideProps() {
  const { data, error } = await supabase.from('daily_quote').select('*');

  if (error || !data || data.length === 0) {
    console.error('데이터 가져오기 실패:', error);
    return { props: { initialQuote: null, quoteList: [] } };
  }

  // 서버에서 랜덤 명언 선택
  const randomQuote = data[Math.floor(Math.random() * data.length)];
  return { props: { initialQuote: randomQuote, quoteList: data } };
}
