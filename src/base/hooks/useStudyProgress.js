import { useStudyProgressStore } from "../stores/useStudyProgressStore";
import { api } from "../utils/fetchUtils";
import { useState } from "react";


/**
 * 사용자 진도 전역 상태를 관리하는 훅 
 * @since 2025-12-14
 * @author kcw
 */

export function useStudyProgress() {

  // [1] 전역 북마크
  const { load, start, progress, complete, initialize, clear, studyProgresses } = useStudyProgressStore()
  
  // [2] 지역 상태
  const [ loading, setLoading ] = useState(false) // 북마크 처리 로딩 상태


  // [3] 함수 설계 (전역 상태 갱신 포함)
  // 북마크 최초 로딩 처리
  const loadStudyProgress = () => {
    const onSuccess = (rp) => load(rp.data)
    api.get('/study-progresses/my', { onSuccess, printMessage: false })
  } 

  // 학습 시작 (진도정보 추가)
  const startStudy = (studyId) => {
    
    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      start(studyId)
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    api.post(`/studies/${studyId}/progress`, { onSuccess, onFinally })
  }


  // 학습 진행 (진행 상태로만 변경)
  const progressStudy = (studyId) => {
    
    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      progress(studyId)
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    api.patch(`/studies/${studyId}/progress/in-progress`, { onSuccess, onFinally })
  }

  // 학습 완료 (진도정보 갱신)
  const completeStudy = (studyId) => {
    
    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      complete(studyId)
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    api.patch(`/studies/${studyId}/progress/complete`, { onSuccess, onFinally })
  }

  // 학습 초기화 (진도 삭제)
  const initializeStudy = (studyId) => {
    
    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      initialize(studyId)
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    api.delete(`/studies/${studyId}/progress`, { onSuccess, onFinally })
  }


  // 학습 진도 일괄 제거 (로그아웃 등과 같은 상태 발생 시)
  const clearStudyProgress = () => {
    clear()
  }
  
  // [4] 반환
  return {
    loading, studyProgresses,
    loadStudyProgress, startStudy, progressStudy, completeStudy, initializeStudy, clearStudyProgress
  }
}