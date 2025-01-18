import { useState, useEffect, useCallback } from 'react';

interface LottoData {
  totSellamnt: number; // 총 판매 금액
  returnValue: string; // 성공 여부
  drwNoDate: string; // 추첨 날짜
  firstWinamnt: number; // 1등 상금
  drwtNo1: number; // 당첨 번호 1
  drwtNo2: number; // 당첨 번호 2
  drwtNo3: number; // 당첨 번호 3
  drwtNo4: number; // 당첨 번호 4
  drwtNo5: number; // 당첨 번호 5
  drwtNo6: number; // 당첨 번호 6
  bnusNo: number; // 보너스 번호
  drwNo: number; // 회차 번호
}

export const useLottoData = () => {
  const [data, setData] = useState<LottoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [latestDrawNumber, setLatestDrawNumber] = useState<number>(0); // 최신 회차 번호
  const [latestDrawDate, setLatestDrawDate] = useState<string>(''); // 최신 회차 날짜 (포맷된 값)

  const formatDate = useCallback((date: Date): string => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }, []);

  const calculateLatestDrawInfo = useCallback(() => {
    const baseDate = new Date('2002-12-07'); // 첫 번째 로또 추첨일
    const today = new Date();

    // 현재 요일과 시간 확인
    const currentDay = today.getDay(); // 0: 일요일, 6: 토요일
    const currentHour = today.getHours(); // 현재 시간 (24시간 기준)
    const currentMinute = today.getMinutes(); // 현재 분

    // 추첨 시간: 토요일 20:35
    const isAfterDrawTime =
      currentDay > 6 || // 일요일 이후
      (currentDay === 6 && (currentHour > 20 || (currentHour === 20 && currentMinute >= 35))); // 토요일 20:35 이후

    // 회차 계산
    const diffInMs = today.getTime() - baseDate.getTime();
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const drawNumber = diffInWeeks + (isAfterDrawTime ? 1 : 0); // 추첨 후라면 +1

    // 이번 주 추첨 날짜 계산
    const drawDate = new Date(baseDate.getTime() + diffInWeeks * (1000 * 60 * 60 * 24 * 7));

    setLatestDrawNumber(drawNumber);
    setLatestDrawDate(formatDate(drawDate));
  }, [formatDate]);

  const fetchLottoData = async (drawNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/lotto?drwNo=${drawNumber}`);
      if (!response.ok) {
        throw new Error('데이터 요청 실패');
      }

      const result = await response.json();

      if (result.returnValue === 'success') {
        setData(result);
      } else {
        throw new Error('유효하지 않은 회차 번호입니다.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 에러 발생');
      }
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const lottoNumbers = data ? [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6] : [];

  useEffect(() => {
    calculateLatestDrawInfo();
  }, [calculateLatestDrawInfo]);

  useEffect(() => {
    if (latestDrawNumber > 0) {
      fetchLottoData(latestDrawNumber);
    }
  }, [latestDrawNumber]);

  return { data, isLoading, error, latestDrawNumber, latestDrawDate, lottoNumbers };
};
