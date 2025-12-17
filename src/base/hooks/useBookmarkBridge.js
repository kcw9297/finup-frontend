import { useEffect, useRef, useState } from "react";
import { api } from "../utils/fetchUtils";
import { useBookmark } from "./useBookmark";

/**
 * 북마크된 Study 목록 조회 (프론트 연결 다리 훅)
 * - /bookmarks/my + /studies/{id} 조합  
 * => 내(khj)가 useStudyList 건드리다가 pagination 제거했더니 연결 고리 끊어짐...
 * 보완을 위해 만듦
 * @author khj
 * @since 2025-12-18
 */

export function useBookmarkBridge() {
  // [1] 상태
  const { bookmarks, loadBookmark } = useBookmark()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [unbookmarkedIds, setUnbookmarkedIds] = useState([])


  // 최초 로딩 여부 (재조회 방지)
  const initializedRef = useRef(false)

  // [2] 북마크 로딩
  useEffect(() => {
    loadBookmark()
  }, [])

  // [3] 북마크 → Study 상세 조회
  useEffect(() => {
    // 최초 1회만 Study 상세 조회
    if (initializedRef.current) return

    if (!bookmarks) return

    // STUDY 북마크 ID만 추출
    const studyIds = (bookmarks ?? [])
      .filter(b => b.bookmarkTarget === "STUDY")
      .map(b => Number(b.targetId))
      .filter(Boolean)

    if (studyIds.length === 0) {
      setRows([])
      setLoading(false)
      return
    }

    setLoading(true)

    // Promise.all로 병렬 조회
    Promise.all(
      studyIds.map(studyId =>
        new Promise((resolve) => {
          api.get(`/studies/${studyId}`, {
            onSuccess: rp => resolve(rp.data),
            onError: () => resolve(null),
            printMessage: false,
          })
        })
      )
    ).then((results) => {
      // 실패한 것 제거
      const validRows = results.filter(Boolean)
      setRows(validRows)
      setLoading(false)
      initializedRef.current = true
    })

  }, [bookmarks])


  // [4] UI 전용 언북마크 처리
  const markUnbookmarked = (studyId) => {
    setUnbookmarkedIds(prev =>
      prev.includes(studyId) ? prev : [...prev, studyId]
    )
  }

  // [4-1] UI 전용 북마크 재등록 처리
  const markBookmarked = (studyId) => {
    setUnbookmarkedIds(prev =>
      prev.filter(id => id !== studyId)
    )
  }


  // [5] 화면에 보여줄 rows (언북마크 상태 포함)
  const visibleRows = rows.map(row => ({
    ...row,
    isBookmarked: !unbookmarkedIds.includes(row.studyId),
  }))



  // [6] 반환
  return {
    rows: visibleRows,
    loading,
    markUnbookmarked,
    markBookmarked,
  }
}