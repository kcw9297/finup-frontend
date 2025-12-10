import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

export function useStudyWordRemoveModal({ handleAfterRemove, admin = false }) {

  // [1] 사용 상태 선언
  const [open, setOpen] = useState(false)
  const [studyWordId, setStudyWordId] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openRemoveModal = (studyWordId) => {
    setStudyWordId(studyWordId);
    setOpen(true);
  }

  // [2] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success');
    handleAfterRemove(studyWordId);
    setOpen(false);
  }

  const onFinally = () => {
    setLoading(false)
  }

  // [3] REST API 요청 함수 생성
  const handleRemove = async () => {
    setLoading(true)
    await api.delete(`/study-words/${studyWordId}`, { onSuccess, onFinally, admin });
  }

  // [4] REST API 요청 함수 생성
  const removeProps = {
      open,
      setOpen,
      title: "단어 삭제",
      content: "현재 단어를 삭제하시겠습니까?",
      submit: {
        endpoint: `/study-words/${studyWordId}`,
        reload: false, // 리로드 비활성화
        admin,
        handleSubmit: handleRemove // 확인 클릭 시 처리 함수
      },
    } 

  // [5] 반환
  return { openRemoveModal, removeProps };

} 