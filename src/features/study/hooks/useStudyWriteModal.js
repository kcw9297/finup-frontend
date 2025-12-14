import { useState } from "react";
import { useReloadStore } from "../../../base/stores/useReloadStore";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { MODAL_FIELDS } from "../constants/studyConstant";

/**
 * 단계 학습 등록 모달 상태관리 custom hook
 * @since 2025-12-09
 * @author kcw
 */

export function useStudyWriteModal({ admin = false }) {

  // [1] 모달 상태
  const [ open, setOpen ] = useState(false);
  const { reload } = useReloadStore()
  const { showSnackbar } = useSnackbar()
  
  // [2] 모달 열기/닫기 함수
  const openWriteModal = () => {
    setOpen(true);
  };

   // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success')
    reload()
    setOpen(false)
  }

  // [4] REST API 요청 함수 생성
  const handleWrite = async (rq) => {
    return await api.post(`/studies`, { onSuccess, admin }, rq)
  }

  // [3] 모달 프롭스 설정
  const writeProps = {
    open,
    setOpen,
    title: "단계 학습 등록",
    fields: MODAL_FIELDS,
    submitText: "등록",
    submit: {
      admin,
      handleSubmit: handleWrite
    }
  };


  // [3] 반환
  return { openWriteModal, writeProps }
}