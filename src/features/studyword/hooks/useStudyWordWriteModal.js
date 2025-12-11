import { useState } from "react";
import { MODAL_FIELDS } from "../constants/studyWordConstant"
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { useReloadStore } from "../../../base/stores/useReloadStore";

/**
 * 개념 학습 단어 등록 모달 상태관리 custom hook
 * @since 2025-12-10
 * @author kcw
 */

export function useStudyWordWriteModal({ admin = false }) {

  // [1] 모달 상태
  const [open, setOpen] = useState(false)
  const { reload } = useReloadStore()
  const { showSnackbar } = useSnackbar()
  
  // [2] 모달 열기/닫기 함수
  const openWriteModal = () => {
    setOpen(true)
  };

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success')
    reload()
    setOpen(false)
  }
  
  
  // [4] REST API 요청 함수 생성
  const handleWrite = async (rq) => {
    return await api.post(`/study-words`, { onSuccess, admin }, rq)
  }

  // [5] 모달 프롭스 설정
  const writeProps = {
    open,
    setOpen,
    title: "단어 등록",
    fields: MODAL_FIELDS,
    submitText: "등록",
    submit: {
      reload: true,
      admin,
      handleSubmit: handleWrite
    }
  };

  // [6] 반환
  return { openWriteModal, writeProps }
}