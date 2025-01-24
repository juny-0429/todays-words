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

  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }, []);

  const calculateLatestDrawNumber = useCallback((): number => {
    const baseDate = new Date('2002-12-07'); // 첫 번째 로또 추첨일
    const today = new Date(); // 현재 날짜
    today.setHours(0, 0, 0, 0); // 시간 제거

    const diffInDays = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7); // 기준일로부터 경과한 주(회차)

    const currentSaturday = new Date(baseDate.getTime() + diffInWeeks * 7 * 24 * 60 * 60 * 1000); // 이번 주 토요일 계산
    currentSaturday.setHours(0, 0, 0, 0); // 시간 제거

    const isSundayOrLater = today > currentSaturday; // 오늘이 이번 주 토요일 이후인지 확인

    return diffInWeeks + (isSundayOrLater ? 1 : 0); // 일요일부터 다음 회차로 계산
  }, []);

  const fetchLottoData = useCallback(
    async (drawNumber: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/lotto?drwNo=${drawNumber}`);
        if (!response.ok) {
          throw new Error('데이터 요청 실패');
        }

        const result: LottoData = await response.json();

        if (result.returnValue === 'success') {
          const formattedDate = formatDate(result.drwNoDate);
          setData({ ...result, drwNoDate: formattedDate });
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
    },
    [formatDate]
  );

  useEffect(() => {
    const drawNumber = calculateLatestDrawNumber();
    fetchLottoData(drawNumber); // 페이지 진입 시 한 번 요청
  }, [calculateLatestDrawNumber, fetchLottoData]);

  const lottoNumbers = data ? [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6] : [];

  return { data, isLoading, error, lottoNumbers };
};
