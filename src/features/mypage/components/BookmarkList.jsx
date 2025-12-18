import { useEffect, useState } from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkEmpty from "./BookmarkEmpty";
import { Box, Typography } from "@mui/material";
import { useBookmark } from "../../../base/hooks/useBookmark";
import { useStudyList } from "../../study/hooks/useStudyList";
import { useBookmarkBridge } from "../../../base/hooks/useBookmarkBridge";

export default function BookmarkList({ list, onRemove }) {


  const { bookmarks, addBookmark, removeBookmark, } = useBookmark();
  // const { searchRp } = useStudyList(); => 꼬임... 결국 searchRp랑
  const { rows, loading, markUnbookmarked, markBookmarked } = useBookmarkBridge()
  // const raw = searchRp?.data;
  // const studyRows = Array.isArray(raw) ? raw : (raw ? [raw] : []);


  // 성공/콜백 시 상태 전환
  const handleRemove = (target, studyId) => {
    markUnbookmarked(studyId)
    removeBookmark(target)   // 서버 성공까지 기다림
  };

  const handleAdd = (target, studyId) => {
    markBookmarked(studyId)
    addBookmark(target)
  };

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
        {!loading && rows.length === 0 && (
          <BookmarkEmpty />
        )}

        {/* List */}
        {!loading && rows.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {rows.map(row => {

              const isBookmarked = row.isBookmarked

              return (
                <BookmarkCard
                  key={row.studyId}
                  row={row}
                  isBookmarked={isBookmarked}
                  onAdd={(target) => handleAdd(target, row.studyId)}
                  onRemove={(target) => handleRemove(target, row.studyId)}
                />
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}
