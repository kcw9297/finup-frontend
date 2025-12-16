import { useEffect } from "react";
import { useBookmark } from "../../../base/hooks/useBookmark";
import BookmarkCard from "./BookmarkCard";
import BookmarkEmpty from "./BookmarkEmpty";
import { Box, Typography } from "@mui/material";
import { useStudyProgress } from "../../../base/hooks/useStudyProgress";

export default function BookmarkList({ items, onRemove }) {

  // [1] 북마크 훅
  const {
    bookmarks,
    loading,
    loadBookmark,
    removeBookmark,
  } = useBookmark()

  // [2] 최초 진입 시 북마크 로딩
  useEffect(() => {
    loadBookmark()
  }, [])

  return (
    <Box sx={{
      p: 3,
      maxWidth: 960
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
          maxWidth: 960,
          mx: 'auto',
        }}
      >
        {/* Empty */}
        {!loading && bookmarks.length === 0 && (
          <BookmarkEmpty />
        )}

        {/* List */}
        {!loading && bookmarks.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {bookmarks.map(item => (
              <BookmarkCard
                key={item.bookmarkId}
                item={item}
                onRemove={removeBookmark}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
