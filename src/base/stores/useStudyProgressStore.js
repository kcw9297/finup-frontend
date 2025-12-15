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


  // 진도 진행 처리 (상태만 변경)
  progress: (studyId) =>
    set((state) => ({
      studyProgresses: state.studyProgresses.map((prev) =>
        Number(prev.studyId) === Number(studyId)  ? { ...prev, studyStatus : 'IN_PROGRESS' } : prev
      )
    })
  ),
  
  // 진도 완료 처리
  complete: (studyId) =>
    set((state) => {

      // 해당 studyId의 진도가 존재하는지 확인 (없는 경우는 새롭게 생성)
      const exists = state.studyProgresses.some(
        prev => Number(prev.studyId) === Number(studyId)
      );

       // 존재하면 상태 변경, 없으면 새로 추가
    if (exists) {
      return {
        studyProgresses: state.studyProgresses.map((prev) =>
          Number(prev.studyId) === Number(studyId)
            ? { ...prev, studyStatus: 'COMPLETED' }
            : prev
        )
      };
    } else {
      return {
        studyProgresses: [
          ...state.studyProgresses,
          { studyId, studyStatus: 'COMPLETED' }
        ]
      };
    }
  }),

  // 진도 제거 (초기화)
  initialize: (studyId) => set((state) => ({
    studyProgresses: state.studyProgresses.filter(prev => !(Number(prev.studyId) === Number(studyId)))
  })),

  // 진도 일괄 제거 (로그아웃 등)
  clear: () => set({ studyProgresses: [] }),

}))
