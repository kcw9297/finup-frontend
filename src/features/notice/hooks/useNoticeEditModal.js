import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { MODAL_FIELDS } from "../constants/noticeConstant";


/**
 * 공지사항 수정 모달 상태관리 custom hook
 * @since 2025-12-15
 * @author kcw
 */

export function useNoticeEditModal({ handleAfterEdit, admin = false }) {

  // [1] 모달 상태
  const [ open, setOpen ] = useState(false)
  const [ initialValues, setInitialValues ] = useState(null)
  const [ noticeId, setNoticeId ] = useState(null)
  const { showSnackbar } = useSnackbar()
  
  // [2] 모달 열기/닫기 함수
  const openEditModal = (initialValues) => {

    const initValue = { noticeId : initialValues.noticeId, title : initialValues.title, content : initialValues.content }
    setInitialValues(initValue);
    setNoticeId(initValue.noticeId)
    setOpen(true);
  }

  // [3] REST API 요청 함수 생성
  const handleEdit = async (rq) => {

    const onSuccess = (rp) => {

      showSnackbar(rp.message, 'success');
      handleAfterEdit(rq);
      setOpen(false);
    }

    return await api.put(`/notices/${noticeId}`, { onSuccess, admin }, rq);
  }

  // [4] 모달 프롭스 설정
  const editProps = {
    open,
    setOpen,
    title: "공지사항 수정",
    fields: MODAL_FIELDS,
    submitText: "수정",
    submit: {
      admin,
      handleSubmit: handleEdit
    },
    initialValues
  }

  // [5] 반환
  return { openEditModal, editProps }
}