import { useEffect, useState } from "react";
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

  // [2] 북마크 로딩
  useEffect(() => {
    loadBookmark()
  }, [])

  // [3] 북마크 → Study 상세 조회
  useEffect(() => {

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
    })

  }, [bookmarks])

  // [4] 반환
  return {
    rows,
    loading,
  }
}