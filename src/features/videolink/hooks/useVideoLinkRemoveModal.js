import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 학습영상 삭제 모달 상태 관리 custom hook
 * @author kcw
 * @since 2025-12-11
 */

export function useVideoLinkRemoveModal({ handleAfterRemove, admin = false }) {

  // [1] 사용 상태 선언
  const [open, setOpen] = useState(false)
  const [ videoLinkId, setVideoLinkId ] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openRemoveModal = (videoLinkId) => {
    setVideoLinkId(videoLinkId);
    setOpen(true);
  }

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success');
    handleAfterRemove(videoLinkId);
    setOpen(false);
  }

  // [4] REST API 요청 함수 생성
  const handleRemove = async () => {
    await api.delete(`/study-words/${videoLinkId}`, { onSuccess, admin });
  }

  // [5] REST API 요청 함수 생성
  const removeProps = {
      open,
      setOpen,
      title: "영상 삭제",
      content: "현재 영상을 삭제하시겠습니까?",
      submit: {
        endpoint: `/study-words/${videoLinkId}`,
        admin,
        handleSubmit: handleRemove // 확인 클릭 시 처리 함수
      },
    } 

  // [5] 반환
  return { openRemoveModal, removeProps };

} 