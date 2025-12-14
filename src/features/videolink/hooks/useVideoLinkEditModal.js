import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 학습 영상 수정 모달 custom Hook
 * @author kcw
 * @since 2025-12-11
 */
export function useVideoLinkEditModal({ handleVerify, handleAfterEdit, admin = false }) {

  // [1] 모달 상태
  const [ open, setOpen ] = useState(false)
  const [ videoLinkId, setVideoLinkId ] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openEditModal = (videoLinkId) => {
    setVideoLinkId(videoLinkId)
    setOpen(true);
  }

  // [3] REST API 요청 함수 생성
  const handleEdit = async (rq) => {

    const onSuccess = (rp) => {
      showSnackbar(rp.message, 'success');
      handleAfterEdit(rp.data); // 새롭게 등록한 응답 정보 전달
      setOpen(false);
    }
    
    return await api.put(`/video-links/${videoLinkId}`, { onSuccess, admin, printMessage: false }, rq);
  }

  // [4] 사용 프롭스 선언
  const editProps = {
    open,
    setOpen,
    title: "영상 재등록",
    submitText: "등록",
    submit: {
      admin,
      handleVerify,
      handleSubmit: handleEdit
    },
  } 

  // [6] 반환
  return { openEditModal, editProps }

}