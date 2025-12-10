import { useState } from "react";
import { useParams } from "react-router-dom";
import { MODAL_FIELDS } from "../constants/studyWordConstant";

/**
 * 개념 단어 수정 모달 custom Hook
 * @author kcw
 * @since 2025-12-10
 */
export function useStudyWordEditModal({ handleAfterEdit, admin = false }) {

  // [1] 모달 상태
  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState(null)

  // [2] 모달 열기/닫기 함수
  const openEditModal = (initialValues) => {
    setInitialValues(initialValues);
    setOpen(true);
  }

  // [3] 사용 프롭스 선언
  const editProps = {
    open,
    setOpen,
    title: "단어 수정",
    fields: MODAL_FIELDS,
    submitText: "수정",
    submit: {
      endpoint: `/study-words/${initialValues?.studyWordId}`,
      method: 'PUT',
      reload: false, // 리로드 비활성화
      admin,
      handleAfterSuccess : handleAfterEdit
    },
    initialValues,
  } 

  // [4] 반환
  return { openEditModal, editProps }

}