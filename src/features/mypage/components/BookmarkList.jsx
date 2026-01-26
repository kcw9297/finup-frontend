import { useEffect, useState } from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkEmpty from "./BookmarkEmpty";
import { Box, Paper, Typography } from "@mui/material";
import { useBookmark } from "../../../base/hooks/useBookmark";
import { useStudyList } from "../../study/hooks/useStudyList";
import { useBookmarkBridge } from "../../../base/hooks/useBookmarkBridge";

export default function BookmarkList() {

  const { bookmarks, addBookmark, removeBookmark } = useBookmark();
  const { rows, loading, markUnbookmarked, markBookmarked } = useBookmarkBridge();

  const handleRemove = (target, studyId) => {
    markUnbookmarked(studyId);
    removeBookmark(target);
  };

  const handleAdd = (target, studyId) => {
    markBookmarked(studyId);
    addBookmark(target);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      py: 6 
    }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 980,
          bgcolor: '#F5F7FF',
          borderRadius: 3,
          p: 5,
        }}
      >
        {/* 제목 */}
        <Box sx={{ p:2, mb: 4 }}>
          <Typography variant="h5" sx={{ pb: 1, fontWeight: 700 }}>
            북마크한 개념 학습
          </Typography>
          <Typography variant="body2" color="text.secondary">
            나중에 다시 보고 싶은 개념을 모아봤어요
          </Typography>
        </Box>

        {/* Empty */}
        {!loading && rows.length === 0 && (
          <BookmarkEmpty />
        )}

        {/* List */}
        {!loading && rows.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {rows.map(row => {
              const isBookmarked = row.isBookmarked;

              return (
                <BookmarkCard
                  key={row.studyId}
                  row={row}
                  isBookmarked={isBookmarked}
                  onAdd={(target) => handleAdd(target, row.studyId)}
                  onRemove={(target) => handleRemove(target, row.studyId)}
                />
              );
            })}
          </Box>
        )}
      </Paper>
    </Box>
  );
}