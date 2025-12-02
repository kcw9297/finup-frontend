import { useState } from 'react';

const INITIAL_LIST = [
  { id: 1, name: '주식 핵심 개념 ', description: '주식의 기본 구조, 가격 및 주문 관련 개념을 배울 수 있어요.', orderNumber: 1 },
  { id: 2, name: '주식 핵심 개념 ', description: '주식의 기본 구조, 가격 및 주문 관련 개념을 배울 수 있어요.', orderNumber: 2 },
  { id: 3, name: '주식 핵심 개념 ', description: '주식의 기본 구조, 가격 및 주문 관련 개념을 배울 수 있어요.', orderNumber: 3 },
];

export function useConceptList() {
  const [list] = useState(INITIAL_LIST);

  return { list };
}