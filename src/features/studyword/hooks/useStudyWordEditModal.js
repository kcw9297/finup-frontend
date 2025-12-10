import { useState } from "react";
import { useParams } from "react-router-dom";
import { MODAL_FIELDS } from "../constants/studyWordConstant";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 개념 단어 수정 모달 custom Hook
 * @author kcw
 * @since 2025-12-10
 */
export function useStudyWordEditModal({ handleAfterEdit, admin = false }) {

  // [1] 모달 상태
  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState(null)
  const [studyWordId, setStudyWordId] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 모달 열기/닫기 함수
  const openEditModal = (initialValues) => {
    setInitialValues(initialValues);
    setStudyWordId(initialValues.studyWordId)
    setOpen(true);
  }

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success');
    handleAfterEdit(studyWordId);
    setOpen(false);
  }


  // [4] REST API 요청 함수 생성
  const handleEdit = async (rq) => {
    return await api.put(`/study-words/${studyWordId}`, { onSuccess, admin }, rq);
  }

  // [5] 사용 프롭스 선언
  const editProps = {
    open,
    setOpen,
    title: "단어 수정",
    fields: MODAL_FIELDS,
    submitText: "수정",
    submit: {
      reload: false, // 리로드 비활성화
      admin,
      handleSubmit: handleEdit
    },
    initialValues,
  } 

  // [6] 반환
  return { openEditModal, editProps }

}