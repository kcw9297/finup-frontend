import { create } from 'zustand'

/**
 * 사용자 학습 진도를 전역적으로 관리하기 위한 store
 * @since 2025-12-14
 * @author kcw
 */

export const useStudyProgressStore = create(set => ({

  // 사용자 북마크
  studyProgresses: [],

  // 페이지 로드 처리 (사용자 진도 정보 일괄 조회 후 저장)
  load: (loadedStudyProgresses) => set({ studyProgresses: loadedStudyProgresses }),

  // 진도 추가 (새롭게 시작)
  start: (studyId) => set((state) => ({
    studyProgresses: [ ...state.studyProgresses, { studyId, studyStatus : 'IN_PROGRESS'} ]
  })),
  
  // 진도 완료 처리
  complete: (studyId) =>
    set((state) => ({
      studyProgresses: state.studyProgresses.map((prev) =>
        prev.studyId === studyId ? { ...prev, studyStatus : 'COMPLETED' } : prev
      )
    })
  ),

  // 진도 제거 (초기화)
  initialize: (studyId) => set((state) => ({
    studyProgresses: state.studyProgresses.filter(prev => !(prev.studyId === studyId))
  })),

  // 진도 일괄 제거 (로그아웃 등)
  clear: () => set({ studyProgresses: [] }),

}))
