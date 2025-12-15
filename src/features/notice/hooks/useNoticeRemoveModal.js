import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

export function useNoticeRemoveModal({ handleAfterRemove, admin = false }) {

  // [1] 사용 상태 선언
  const [ open, setOpen ] = useState(false)
  const [ noticeId, setNoticeId ] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openRemoveModal = (noticeId) => {
    setNoticeId(noticeId);
    setOpen(true);
  }

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success');
    handleAfterRemove(noticeId);
    setOpen(false);
  }

  // [4] REST API 요청 함수 생성
  const handleRemove = async () => {
    await api.delete(`/notices/${noticeId}`, { onSuccess, admin });
  }

  // [5] REST API 요청 함수 생성
  const removeProps = {
      open,
      setOpen,
      title: "공지사항 삭제",
      content: "현재 공지사항을 삭제하시겠습니까?",
      submit: {
        admin,
        handleSubmit: handleRemove // 확인 클릭 시 처리 함수
      },
    } 

  // [5] 반환
  return { openRemoveModal, removeProps };

} 