import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { drwNo } = req.query; // 회차 번호

  if (!drwNo) {
    res.status(400).json({ error: '회차 번호가 필요합니다.' });
    return;
  }

  try {
    const response = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`);
    const data = await response.json();

    if (data.returnValue === 'success') {
      res.status(200).json(data); // 성공적으로 응답 반환
    } else {
      res.status(404).json({ error: '유효하지 않은 회차 번호입니다.' });
    }
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    res.status(500).json({ error: '로또 API 요청 중 문제가 발생했습니다.' });
  }
}
