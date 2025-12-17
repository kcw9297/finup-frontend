import { useEffect, useState } from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkEmpty from "./BookmarkEmpty";
import { Box, Typography } from "@mui/material";
import { useBookmark } from "../../../base/hooks/useBookmark";
import { useStudyList } from "../../study/hooks/useStudyList";

export default function BookmarkList({ list, loading, onRemove }) {


  const { bookmarks, addBookmark, removeBookmark, } = useBookmark();
  const { searchRp } = useStudyList();
  const raw = searchRp?.data;
  const studyRows = Array.isArray(raw) ? raw : (raw ? [raw] : []);


  const [renderRows, setRenderRows] = useState([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return
    if (studyRows.length === 0) return;
    if (bookmarks.length === 0) {
      setRenderRows([]);        // ← 새로고침 시 비어야 함
      return;
    }

    const initialRows = studyRows.filter(row =>
      bookmarks.some(b =>
        b.bookmarkTarget === 'STUDY' &&
        Number(b.targetId) === Number(row.studyId)
      )
    )

    setRenderRows(initialRows)
    setInitialized(true)
  }, [studyRows, bookmarks, initialized]);


  // [1] 북마크 훅


  // 카드별 북마크 상태
  // const [bookmarkMap, setBookmarkMap] = useState({})

  // [2] 최초 진입 시 북마크 로딩
  // useEffect(() => {
  //   console.log('🔥 loadBookmark 실행')
  //   loadBookmark()
  // }, [])

  // 성공/콜백 시 상태 전환
  const handleRemove = (target) => {
    removeBookmark(target);   // 서버 성공까지 기다림

    // setBookmarkMap(prev => ({
    //   ...prev,
    //   [target.targetId]: false
    // }));
  };

  const handleAdd = (target) => {
    addBookmark(target);

    // setBookmarkMap(prev => ({
    //   ...prev,
    //   [target.targetId]: true
    // }));
  };
  const bookmarkStudyIds = bookmarks
    .filter(b => b.bookmarkTarget === 'STUDY')
    .map(b => b.targetId);

  return (
    <Box sx={{
      p: 3,
      maxWidth: 1260
    }}>

      {/* 제목 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ pb: 1, fontWeight: 700 }}>
          북마크한 개념 학습
        </Typography>
        <Typography variant="body2" color="text.secondary">
          나중에 다시 보고 싶은 개념을 모아봤어요
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 1000,
        }}
      >
        {/* Empty */}
        {!loading && renderRows.length === 0 && (
          <BookmarkEmpty />
        )}

        {/* List */}
        {!loading && renderRows.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {renderRows.map(row => {

              const isBookmarked = bookmarks.some(b =>
                b.bookmarkTarget === 'STUDY' &&
                Number(b.targetId) === Number(row.studyId)
              );
              return (
                <BookmarkCard
                  key={row.studyId}
                  row={row}
                  isBookmarked={isBookmarked}
                  onAdd={handleAdd}
                  onRemove={handleRemove}
                />
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}
