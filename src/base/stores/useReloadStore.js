import { create } from 'zustand'

/**
 * 페이지 리로드를 감지시키기 위한 전역 상태
 */

export const useReloadStore = create(set => ({

  // 리로드를 감지하기 위한 값 (값 변화를 감지시켜 리로드 유도)
  reloading: 0,

  // 리로드 수행 - 값을 1 증가시켜, useEffect 같은 훅에서 이 값의 변경을 감지하도록 유도
  reload: () => set(state => ({
    reloading: state.reloading + 1
  })),

}))
