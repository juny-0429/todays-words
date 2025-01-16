import React, { useState } from 'react';
import { useLottoData } from 'src/hook/lottoNumber';

export default function Number() {
  const excludedNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  const lottoInfo = useLottoData();

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
      return;
    }

    if (selectedNumbers.length >= 39) return alert('최대 39개까지 제외할 수 있습니다.');

    setSelectedNumbers([...selectedNumbers, number]);
  };

  // 제외할 숫자 선택 초기화
  const resetNumbers = () => {
    setSelectedNumbers([]);
    setLuckyNumbers([]);
  };

  const toggleLuckyNumbers = () => {
    // 1~45 중에서 제외된 숫자를 제거
    const availableNumbers = excludedNumbers.filter((num) => !selectedNumbers.includes(num) && num !== 0);

    // 랜덤하게 6개 숫자를 선택
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 6) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const chosenNumber = availableNumbers[randomIndex];
      if (!randomNumbers.includes(chosenNumber)) {
        randomNumbers.push(chosenNumber);
      }
    }

    randomNumbers.sort((a, b) => a - b);

    setLuckyNumbers(randomNumbers);
  };

  // 숫자에 따라 색상 결정
  const getColor = (number: number) => {
    if (number === 0) return '#C9BEAC';
    if (number < 10) return '#FEECAB';
    if (number < 20) return '#ABC4FE';
    if (number < 30) return '#FEABAB';
    if (number < 40) return '#E2E2E2';
    return '#ABFEAB';
  };

  return (
    <main className="flex flex-col justify-between items-center p-2 bg-background w-full h-screen">
      <h1>Lucky Number</h1>

      {/* 지난 회차 당첨 번호 */}
      <section>
        <div className="flex flex-col items-center">
          <h2 className="text-base text-mid-night-blue font-bold tracking-widest">{lottoInfo.latestDrawNumber} 회차 당첨 번호</h2>
          <time className="text-xs text-deep-gray font-normal tracking-widest">({lottoInfo.latestDrawDate} 추첨)</time>
        </div>

        <div className="flex justify-center items-center gap-2">
          {lottoInfo.lottoNumbers.map((lotteNumber) => (
            <button key={lotteNumber} className="w-6 h-6 rounded-full outline outline-2 text-xs font-bold" style={{ backgroundColor: getColor(lotteNumber) }}>
              {lotteNumber}
            </button>
          ))}
          <span className="text-3xl text-mid-night-blue font-normal" style={{ transform: 'translateY(-2px)' }}>
            +
          </span>
          <button className="w-6 h-6 rounded-full outline outline-2 text-xs font-bold" style={{ backgroundColor: getColor(lottoInfo.data?.bnusNo ?? 0) }}>
            {lottoInfo.data?.bnusNo}
          </button>
        </div>
      </section>

      {/* 랜덤 번호 추출 */}
      <section className="flex flex-col items-center gap-3 p-1 bg-white outline outline-2 outline-light-black rounded-lg  w-80 h-24">
        <h2 className="text-lg text-mid-night-blue font-bold tracking-widest">랜덤 번호 추출</h2>

        <div className="flex justify-center items-center gap-3">
          {luckyNumbers.map((luckyNumber) => (
            <button key={luckyNumber} className="w-10 h-10 rounded-full outline outline-2 font-bold" style={{ backgroundColor: getColor(luckyNumber) }}>
              {luckyNumber}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-xl text-deep-ember font-bold">제외할 숫자 선택</h2>

        <div className="grid grid-cols-7 justify-items-center align-items-center gap-y-2 w-full">
          {excludedNumbers.map((number) => (
            <button key={number} onClick={() => toggleNumber(number)} className={`w-10 h-10 rounded-full outline outline-2 font-bold ${selectedNumbers.includes(number) ? 'bg-red-500' : 'bg-deep-beige'}`}>
              {number}
            </button>
          ))}
        </div>
      </section>

      <div className="flex justify-center gap-5">
        <button className="w-40 h-11 bg-green rounded-full outline outline-2 outline-light-black text-lg text-white font-bold tracking-widest" onClick={resetNumbers}>
          초기화
        </button>
        <button className="w-40 h-11 bg-deep-ember rounded-full outline outline-2 outline-light-black text-lg text-white font-bold tracking-widest" onClick={toggleLuckyNumbers}>
          랜덤 뽑기
        </button>
      </div>
    </main>
  );
}
