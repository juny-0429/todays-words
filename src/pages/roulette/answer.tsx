import { useState } from 'react';
import { jalnan2 } from 'src/theme/fonts';
import Image from 'next/image';
import AnswerButtonImg from '@/assets/images/answer-button.png';
import { supabase } from 'src/lib/supabaseClient';
import { useRouter } from 'next/router';

interface AnswerItem {
  id: number;
  answer: string;
}

interface Props {
  initialAnswers: AnswerItem[];
}

export default function Answer({ initialAnswers }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const router = useRouter();

  const handleButtonClick = () => {
    if (initialAnswers.length > 0) {
      // 랜덤 문구 선택
      const randomAnswer = initialAnswers[Math.floor(Math.random() * initialAnswers.length)].answer;
      setSelectedAnswer(randomAnswer);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnswer(null);
  };

  const toggleGuideModal = () => {
    setIsGuideModalOpen(!isGuideModalOpen);
  };

  return (
    <main className="flex flex-col justify-between items-center px-6 py-10 w-full h-screen bg-peach-cream">
      <h1 className={`text-3xl text-mid-night-blue ${jalnan2.className}`}>Today&apos;s Answers</h1>

      {/* 버튼 */}
      <div className="flex flex-col items-center gap-7 w-full">
        <button onClick={handleButtonClick}>
          <Image src={AnswerButtonImg} width={230} height={230} alt="answer button image" />
        </button>

        <button onClick={toggleGuideModal} className="w-52 h-12 rounded-full border-2 shadow-lg bg-orange text-xl text-light-black font-bold tracking-widest">
          가이드 보기
        </button>

        <button onClick={router.back} className="w-52 h-12 rounded-full border-2 text-xl text-deep-beige font-bold tracking-widest">
          뒤로가기
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 p-5 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-bold text-mid-night-blue mb-4">오늘의 해답</h2>
            <p className="text-sm text-light-black text-center">{selectedAnswer || '답을 불러오는 중입니다...'}</p>
            <button onClick={closeModal} className="mt-10 px-4 py-2 bg-mid-night-blue text-white rounded-md">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 가이드 모달 */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 p-5 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="pb-6 text-xl text-mid-night-blue font-bold">&apos;오늘의 해답&apos; 가이드</h2>

            <ol className="flex flex-col gap-4 list-decimal list-outside pl-5">
              <li>
                <h3 className="text-sm text-mid-night-blue font-bold pb-2">질문을 떠올리세요.</h3>
                <p className="text-xs text-light-black font-light">
                &quot;오늘의 해답&quot;을 사용하기 전에 마음속으로 질문을 명확히 생각합니다. 질문은 한 번에 하나씩, 완전한 문장으로 구성하는 것이 좋습니다.
                  <br />
                  <em>예: "이번에 취업이 잘 될까요?"</em>
                </p>
              </li>
              <li>
                <h3 className="text-sm text-mid-night-blue font-bold pb-2">질문에 집중하세요.</h3>
                <p className="text-xs text-light-black font-light">
                  질문을 떠올리며, 마음을 차분히 가라앉힙니다.
                  <br />
                  화면 가운데 버튼을 눌러, 답을 확인할 준비를 합니다.
                </p>
              </li>
              <li>
                <h3 className="text-sm text-mid-night-blue font-bold pb-2">버튼을 눌러 답을 확인하세요.</h3>
                <p className="text-xs text-light-black font-light">
                  질문이 충분히 떠오르고 집중되었다면, 버튼을 누릅니다.
                  <br />
                  화면에 나타나는 문장이 바로 당신의 질문에 대한 답입니다.
                </p>
              </li>
            </ol>
            <button onClick={toggleGuideModal} className="mt-8 px-4 py-2 bg-mid-night-blue text-white rounded-md">
              닫기
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-deep-ember font-medium">&quot;오늘의 해답&quot;은 모든 답을 정답으로 제시하지 않습니다.</p>
    </main>
  );
}

// 서버사이드 데이터 가져오기
export async function getServerSideProps() {
  const { data, error } = await supabase.from('todays_answer').select('*');
  if (error) {
    console.error('데이터 가져오기 실패:', error);
    return { props: { initialAnswers: [] } };
  }
  return { props: { initialAnswers: data || [] } };
}
