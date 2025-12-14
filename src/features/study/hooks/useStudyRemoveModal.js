import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

export function useStudyRemoveModal({ handleAfterRemove, admin = false }) {

  // [1] 사용 상태 선언
  const [ open, setOpen ] = useState(false)
  const [ studyId, setStudyId ] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openRemoveModal = (studyId) => {
    setStudyId(studyId);
    setOpen(true);
  }

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success');
    handleAfterRemove(studyId);
    setOpen(false);
  }

  // [4] REST API 요청 함수 생성
  const handleRemove = async () => {
    await api.delete(`/studies/${studyId}`, { onSuccess, admin });
  }

  // [5] REST API 요청 함수 생성
  const removeProps = {
      open,
      setOpen,
      title: "학습 정보 삭제",
      content: "현재 학습 정보를 삭제하시겠습니까?",
      submit: {
        admin,
        handleSubmit: handleRemove // 확인 클릭 시 처리 함수
      },
    } 

  // [5] 반환
  return { openRemoveModal, removeProps };

} 