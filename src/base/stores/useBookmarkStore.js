import { create } from 'zustand'

/**
 * 사용자 북마크를 전역적으로 관리하기 위한 store
 * @since 2025-12-13
 * @author kcw
 */

export const useBookmarkStore = create(set => ({

  // 사용자 북마크
  bookmarks: [],

  // 페이지 로드 처리 (사용자 북마크 일괄 조회 후 저장)
  load: (loadedBookmarks) => set({ bookmarks: loadedBookmarks }),

  // 북마크 추가
  add: (bookmark) => set((state) => ({
    bookmarks: [...state.bookmarks, bookmark]
  })),
  
  // 북마크 제거
  remove: (bookmark) => set((state) => ({
    bookmarks: state.bookmarks.filter(prev =>
      !(Number(prev.targetId) === Number(bookmark.targetId) && 
        prev.bookmarkTarget === bookmark.bookmarkTarget)
    )
  })),

  // 북마크 일괄 제거 (로그아웃 등)
  clear: () => set({ bookmarks: [] }),

}))
