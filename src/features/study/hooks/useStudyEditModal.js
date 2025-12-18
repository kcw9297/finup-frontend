import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { MODAL_FIELDS } from "../constants/studyConstant";


/**
 * 단계 학습 수정 모달 상태관리 custom hook
 * @since 2025-12-09
 * @author kcw
 */

export function useStudyEditModal({ handleAfterEdit = () => { }, admin = false }) {

  // [1] 모달 상태
  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState(null)
  const [studyId, setStudyId] = useState(null)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openEditModal = (initialValues) => {
    setInitialValues(initialValues);
    setStudyId(initialValues.studyId)
    setOpen(true);
  }

  // [3] REST API 요청 함수 생성
  const handleEdit = async (rq) => {

    const onSuccess = (rp) => {

      showSnackbar(rp.message, 'success');
      handleAfterEdit(rq);
      setOpen(false);
    }

    const onError = (rp) => {
      showSnackbar(rp.message ?? '수정에 실패했습니다.', 'warning')
    }

    return await api.put(`/studies/${studyId}`, { onSuccess, onError, admin }, rq);
  }

  // [4] 모달 프롭스 설정
  const editProps = {
    open,
    setOpen,
    title: "단계 학습 수정",
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