import { useState } from "react";


// 모달 필드
const MODAL_FIELDS = [
  { name: 'name', label: '학습명', helperText: '5자 이상 30자 이내 제목 입력 (특수문자 제외)' },
  { name: 'summary', label: '요약', helperText: '5자 이상 30자 이내 제목 입력 (특수문자 제외)' },
  { name: 'description', label: '본문', multiline: true, rows: 4, helperText: '10자 이상 100자 이내 본문 입력' },
  { 
    name: 'level', 
    label: '레벨', 
    select: true,  // 셀렉트 활성화
    options: [     // 옵션 목록
      { value: 1, label: '레벨 1' },
      { value: 2, label: '레벨 2' },
      { value: 3, label: '레벨 3' },
      { value: 4, label: '레벨 4' },
      { value: 5, label: '레벨 5' },
    ],
    helperText: '학습 레벨 선택'
  },
];


/**
 * 단계 학습 등록 모달 상태관리 custom hook
 * @since 2025-12-09
 * @author kcw
 */

export function useWriteModal({ admin = false }) {

  // [1] 모달 상태
  const [open, setOpen] = useState(false);
  
  // [2] 모달 열기/닫기 함수
  const openWriteModal = () => {
    setOpen(true);
  };

  // [3] 모달 프롭스 설정
  const writeProps = {
    open,
    setOpen,
    title: "단계 학습 등록",
    fields: MODAL_FIELDS,
    submitText: "등록",
    submit: {
      endpoint: '/studies',
      method: 'POST',
      reload: true,
      admin,
    }
  };


  // [3] 반환
  return { openWriteModal, writeProps }
}