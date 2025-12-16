
/**
 * 사용자 북마크 전역 상태를 관리하는 훅 
 * @since 2025-12-08
 * @author kcw
 */

import { api } from "../utils/fetchUtils";
import { useBookmarkStore } from "../stores/useBookmarkStore";
import { useState } from "react";

export function useBookmark() {

  // [1] 전역 북마크
  const bookmarks = useBookmarkStore(state => state.bookmarks)
  const { load, add, remove, clear } = useBookmarkStore()

  // [2] 지역 상태
  const [loading, setLoading] = useState(false) // 북마크 처리 로딩 상태


  // [3] 함수 설계 (전역 상태 갱신 포함)
  // 북마크 최초 로딩 처리
  const loadBookmark = () => {
    const onSuccess = (rp) => load(rp.data)
    api.get('/bookmarks/my', { onSuccess, printMessage: false })
  }

  // 북마크 추가
  const addBookmark = (target) => {

    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      add(target)
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    api.post('/bookmarks', { onSuccess, onFinally, printMessage: false }, target)
  }

  // 북마크 업데이트 (곧바로 삭제 안되게끔) => 만든 후 삭제 로직 추가

  // 북마크 삭제
  const removeBookmark = (target) => {

    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      remove(target)
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    // URL 파라미터
    api.delete('/bookmarks', { params: target, onSuccess, onFinally, printMessage: false })
  }


  // 북마크 일괄 제거 (로그아웃 등과 같은 상태 발생 시)
  const clearBookmark = () => {
    clear()
  }

  // [4] 반환
  return {
    loading, bookmarks,
    loadBookmark, addBookmark, removeBookmark, clearBookmark
  }
}