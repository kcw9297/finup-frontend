import { useState } from "react"
import { useSnackbar } from "../../../base/provider/SnackbarProvider"
import { api } from "../../../base/utils/fetchUtils"
import { useNavigate } from "react-router-dom"
import { useStudyProgress } from "../../../base/hooks/useStudyProgress"

/**
 * 학습 진도 시작 안내모달 상태관리 custom hook
 * @since 2025-12-14
 * @author kcw
 */

export function useStudyProgressStartModal({ admin = false }) {

  // [1] 사용 상태 선언
  const [ open, setOpen ] = useState(false)
  const [ study, setStudy ] = useState(false)
  const { showSnackbar } = useSnackbar()
  const { startStudy } = useStudyProgress()
  const navigate = useNavigate()

  // [2] 모달 열기/닫기 함수
  const openStartModal = (study) => {
    setStudy(study);
    setOpen(true);
  }

  // [3] 성공/실패/최종 처리 함수 선언
  const onSuccess = (rp) => {
    startStudy(study.studyId)
    setOpen(false);
    navigate(`/studies/${study.studyId}`)
  }

  // [4] REST API 요청 함수 생성
  const handleStart = async () => {
    await api.post(`/studies/${study.studyId}/progress`, { onSuccess, admin, printMessage: false })
  }

  // [5] REST API 요청 함수 생성
  const startProps = {
      open,
      setOpen,
      title: "학습 시작 안내",
      content: `현재 학습을 시작하시겠습니까?\n선택 학습 : ${study.name}`,
      submit: {
        admin,
        handleSubmit: handleStart // 확인 클릭 시 처리 함수
      },
    } 

  // [6] 반환
  return { openStartModal, startProps };
}