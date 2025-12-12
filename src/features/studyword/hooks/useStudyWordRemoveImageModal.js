import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { flushSync } from "react-dom";

export function useStudyWordRemoveImageModal({ handleAfterRemoveImageFile, admin = false }) {

  // [1] 사용 상태 선언
  const [open, setOpen] = useState(false)
  const [studyWordId, setStudyWordId] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openRemoveModal = (studyWordId) => {
    setStudyWordId(studyWordId);
    setOpen(true);
  }

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success');
    handleAfterRemoveImageFile(studyWordId);
    setOpen(false);
  }

  // [4] REST API 요청 함수 생성
  const handleRemove = async () => {

    // 스크롤 정보 저장
    const scrollY = window.scrollY;

    // REST API 호출
    const json = await api.delete(`/study-words/${studyWordId}/image`, { onSuccess, admin })

    // 동기적 호출 완료 후, 즉시 리로드
    flushSync(() => {if (json.success) handleAfterRemoveImageFile(studyWordId)})
    window.scrollTo(0, scrollY)
  }

  // [5] REST API 요청 함수 생성
  const removeProps = {
      open,
      setOpen,
      title: "단어 이미지 삭제",
      content: "현재 단어 이미지를 삭제하시겠습니까?",
      submit: {
        endpoint: `/study-words/${studyWordId}`,
        admin,
        handleSubmit: handleRemove // 확인 클릭 시 처리 함수
      },
    } 

  // [6] 반환
  return { openRemoveModal, removeProps };

} 