
/**
 * 사용자 북마크 전역 상태를 관리하는 훅 
 * @since 2025-12-08
 * @author kcw
 */

import { useBookmarkStore } from "../../../base/stores/useBookmarkStore";
import { useState } from "react";
import { api } from './../../../base/utils/fetchUtils';
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

export function useMyBookmark() {

  // [1] 전역 북마크
  const bookmarks = useBookmarkStore(state => state.bookmarks)
  const { load, add, remove, clear } = useBookmarkStore()

  // [2] 지역 상태
  const [loading, setLoading] = useState(false) // 북마크 처리 로딩 상태

  const { showSnackbar } = useSnackbar()

  // [3] 함수 설계 (전역 상태 갱신 포함)
  // 북마크 최초 로딩 처리
  // const loadMyBookmark = () => {
  //   setLoading(true)

  //   const onSuccess = (rp) => {
  //     load(rp.data)
  //   }

  //   const onFinally = () => {
  //     setLoading(false)
  //   }

  //   api.get('/bookmarks/my', { onSuccess, onFinally, printMessage: false, admin: false, })
  // }

  // 북마크 추가
  const addMyBookmark = (target) => {

    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      showSnackbar(rp.message, "success")
      setLoading(false)
    }

    const onFinally = () => {
      setLoading(false)
    }

    api.post('/bookmarks', { onSuccess, onFinally, printMessage: false, admin: false, }, {
      targetId: Number(target.targetId),
      bookmarkTarget: target.bookmarkTarget,
    })
  }

  // 북마크 삭제
  const removeMyBookmark = (target) => {
    setLoading(true)

    // 성공/실패/최종 함수 정의
    const onSuccess = (rp) => {
      showSnackbar("삭제에 성공했습니다.", "success")
      remove(target)
    }

    const onFinally = () => {
      setLoading(false)
    }

    // URL 파라미터
    api.delete('/bookmarks', {
      params: {
        targetId: Number(target.targetId),
        bookmarkTarget: target.bookmarkTarget,
      },
      printMessage: false,
      admin: false,
      onSuccess,
      onFinally
    })
  }


  // 북마크 일괄 제거 (로그아웃 등과 같은 상태 발생 시)
  const clearBookmark = () => {
    clear()
  }

  // [4] 반환
  return {
    loading, bookmarks,
    addMyBookmark, removeMyBookmark, clearBookmark
  }
}