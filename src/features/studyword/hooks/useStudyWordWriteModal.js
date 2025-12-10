import { useState } from "react";
import { MODAL_FIELDS } from "../constants/studyWordConstant"

/**
 * 개념 학습 단어 등록 모달 상태관리 custom hook
 * @since 2025-12-10
 * @author kcw
 */

export function useStudyWordWriteModal({ admin = false }) {

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
    title: "단어 등록",
    fields: MODAL_FIELDS,
    submitText: "등록",
    submit: {
      endpoint: '/study-words',
      method: 'POST',
      reload: true,
      admin,
    }
  };

  // [3] 반환
  return { openWriteModal, writeProps }
}